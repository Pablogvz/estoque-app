"use client"; // Make sure this is at the top

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Home } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { AddProduct } from '../components/AddProduct';

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// Generate random products (you may want to use static data instead)
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
};

export default function Produto() {
  const [products, setProducts] = useState<Product[]>([]); // Initialize as an empty array

  useEffect(() => {
    // Only run on the client-side to avoid hydration issues
    const initialProducts = generateRandomProducts(10);
    setProducts(initialProducts);
  }, []);

  // Function to add a new product
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="container mx-auto p-4">
      <Button className="mb-4 w-20">
        <Link href="/" passHref>
          <div className="flex items-center cursor-pointer">
            <Home className="mr-1 h-4 w-4" />
            <span>Home</span>
          </div>
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-center">Produtos</h1>
      <AddProduct onAddProduct={addProduct} />  {/* Pass the addProduct function as a prop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {product.name}
                <Badge variant={product.stock > 50 ? "default" : "destructive"}>
                  {product.stock > 50 ? "Em estoque" : "Baixo estoque"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">${product.price}</span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Package className="mr-1 h-4 w-4" /> {product.stock} unidades
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
