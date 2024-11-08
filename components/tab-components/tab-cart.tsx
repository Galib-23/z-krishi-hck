"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

const TabCart = () => {
  const [cartProducts, setCartProducts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cart');
      const data = await res.json();
      setCartProducts(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
      setError("Error in fetching cart products");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleDeleteCart = async (cartItemId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/cart/${cartItemId}`, {
            method: 'DELETE',
          });

          if (!res.ok) throw new Error('Failed to delete item');
          else {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            setCartProducts((prevCartProducts: any) => ({
              ...prevCartProducts,
              items: prevCartProducts.items.filter((item: any) => item.id !== cartItemId),
            }));
          }
        } catch (error) {
          console.error('Error deleting item:', error);
          Swal.fire("Error in deletion!")
        }
      }
    });
  }

  if (loading || !cartProducts) {
    return (
      <p>Loading..</p>
    )
  }

  return (
    <div>
      <Table className="w-full max-w-4xl border border-gray-300 rounded-lg overflow-hidden">
        <TableCaption className="underline text-sm text-gray-700 p-4 font-semibold">A list of your recent purchases.</TableCaption>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="w-[100px] py-3 px-4 text-left text-gray-600 font-medium">#</TableHead>
            <TableHead className="w-[100px] py-3 px-4 text-left text-gray-600 font-medium">Item</TableHead>
            <TableHead className="w-[100px] py-3 px-4 text-left text-gray-600 font-medium">Price</TableHead>
            <TableHead className="w-[100px] py-3 px-4 text-left text-gray-600 font-medium">Quantity</TableHead>
            <TableHead className="w-[100px] py-3 px-4 text-left text-gray-600 font-medium">Operation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {
            cartProducts?.items?.map((item: any) => {
              return (
                <TableRow key={item.product.id}>
                  <TableCell>
                    <Image className='object-cover rounded-md border-2 border-gray-600 shadow-md' src={item.product.productImage} alt="image" width={80} height={80} />
                  </TableCell>
                  <TableCell className="font-medium">{item.product.productName}</TableCell>
                  <TableCell>{item.product.productPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="pt-9 flex items-center justify-center h-full">
                    <Trash2 onClick={() => handleDeleteCart(item.id)} color="red" className="cursor-pointer" size={20} />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      {
        error && <p className="text-sm mt-1 text-red-500">{error}</p>
      }
    </div>
  )
}

export default TabCart