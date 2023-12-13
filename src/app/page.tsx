"use client";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Product {
  id: number;
  nome: string;
  isEditing: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);

    try {
      const response = await api.get("/produtos");
      console.log(response);
      setItems(response.data);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem() {
    const data: Omit<Product, "id"> = { nome: textInput, isEditing: false };

    try {
      const response = await api.post("/produtos", data);
      loadItems();
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleDeleteItem(itemId: number) {
    console.log(itemId);

    try {
      await api.delete(`/produtos/${itemId}`);

      const filteredItems = items.filter((item) => item.id !== itemId);
      setItems(filteredItems);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function handleEditItem(itemId: number) {
    console.log(itemId);

    const changedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isEditing: true };
      }
      return item;
    });

    setItems(changedItems);
  }

  function handleUpdateItem(itemId: number) {
    console.log(itemId);
    // put

    const changedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isEditing: false };
      }
      return item;
    });

    setItems(changedItems);
  }

  function handleChangeItem(itemId: number, textValue: string) {
    const changedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, nome: textValue };
      }
      return item;
    });

    setItems(changedItems);
  }

  return (
    <main>
      <div style={{ marginBottom: 10 }}>
        <input
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />
        <button onClick={handleAddItem}>Enviar</button>
      </div>

      <span>{loading && "Carregando..."}</span>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.isEditing ? (
              <input
                onChange={(e) => handleChangeItem(item.id, e.target.value)}
                value={item.nome}
              />
            ) : (
              item.nome
            )}

            {item.isEditing ? (
              <button onClick={() => handleUpdateItem(item.id)}>Save</button>
            ) : (
              <button onClick={() => handleEditItem(item.id)}>Edit</button>
            )}

            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
