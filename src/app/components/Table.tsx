"use client"; 

import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Define o tipo Product
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// Gera produtos aleatórios
const generateRandomProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const productNames = ['Laptop', 'Smartphone', 'Headphones', 'Keyboard', 'Mouse', 'Monitor', 'Tablet', 'Printer', 'Camera', 'Speaker'];

  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      name: productNames[Math.floor(Math.random() * productNames.length)],
      price: Math.floor(Math.random() * 1000) + 1,
      stock: Math.floor(Math.random() * 100) + 1
    });
  }

  return products;
}

export default function StockManager() {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    // Gerar produtos aleatórios apenas no cliente
    setProducts(generateRandomProducts(10));
  }, []);


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tabela de produtos</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 10 ? "Em Estoque" : product.stock > 0 ? "Estoque Baixo" : "Fora de Estoque"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
