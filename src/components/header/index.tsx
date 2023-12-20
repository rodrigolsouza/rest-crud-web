"use client";
import { usePathname } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem, Link, Badge } from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";

import { useContext } from "react";
import { ProductContext } from "@/contexts/ProductContext";

const links = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Sobre", href: "/sobre" },
];

export function Header() {
  const pathname = usePathname();
  const numProducts = useContext(ProductContext)

  return (
    <Navbar position="static" isBordered>
      <NavbarContent className="flex flex-1 gap-4" justify="center">
        {links.map((item, index) => (
          <NavbarItem key={index} isActive={item.href === pathname}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>

        ))}
      </NavbarContent>
      <Badge color="danger" content={numProducts} shape="circle">
          <BsCart3 className="fill-current" size={30} />
        </Badge>
    </Navbar>
  );
}
