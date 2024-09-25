"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Accept onAddProduct as a prop
interface AddProductProps {
  onAddProduct: (product: { id: number; name: string; price: number; stock: number }) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome do produto deve ter pelo menos 2 caracteres.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Preço deve ser um número válido.",
  }),
})

export function AddProduct({ onAddProduct }: AddProductProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newProduct = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (make this better in real app)
      name: values.name,
      price: Number(values.price),
      stock: Math.floor(Math.random() * 100) + 1, // Random stock for new product
    };

    toast({
      title: "Produto adicionado",
      description: `Nome: ${newProduct.name}, Preço: R$ ${newProduct.price}`,
    });

    onAddProduct(newProduct); // Call the onAddProduct function
    setOpen(false); 
    form.reset(); 
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Adicionar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo produto aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o preço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar Produto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
