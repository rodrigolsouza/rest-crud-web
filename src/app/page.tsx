"use client";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

interface Product {
  id: number;
  nome: string;
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
    const data = { nome: textInput };

    try {
      const response = await api.post("/produtos", data);
      loadItems();
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function handleDeleteItem(itemId: number) {
    console.log(itemId);
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
            {item.nome}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
