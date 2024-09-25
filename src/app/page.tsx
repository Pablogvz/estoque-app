"use client"; // Adicione esta linha no topo do arquivo

import Link from 'next/link';
import StockManager from './components/Table';
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Gestão de Estoque
      </h1>
      <Button className="mb-4">      
        <Link href="/produto" >
          Produtos
        </Link>
      </Button>

      <StockManager/>
    </div>
  );
}
