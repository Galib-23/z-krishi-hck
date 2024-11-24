"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import bkash from "@/assets/bkash.png";
import nagad from "@/assets/nagad.svg";
import rocket from "@/assets/rocket.png";

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

  const handleCheckout = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Checkout"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/cart`, {
            method: 'DELETE',
          });

          if (!res.ok) throw new Error('Failed to checkout item');
          else {
            Swal.fire({
              title: "Checkout Successfull!",
              icon: "success"
            });
            setCartProducts([]);
          }
        } catch (error) {
          console.error('Error checkout item:', error);
          Swal.fire("Error in checkout!")
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
        {/* <TableCaption className="underline text-sm text-gray-700 p-4 font-semibold">A list of your recent purchases.</TableCaption> */}
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
      <div className="flex flex-row items-center gap-10 mt-10">
        <div>
          <button onClick={handleCheckout} type="button"
            className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-teal-700 to-teal-300">Checkout</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center">
            <input
              disabled
              type="radio"
              className="w-5 h-5 cursor-pointer"
              id="card"
              checked
            />
            <label
              htmlFor="card"
              className="ml-4 flex gap-2 cursor-pointer"
            >
              <Image
                src={bkash}
                className="w-12 object-contain"
                alt="card1"
              />
              <Image
                src={rocket}
                className="w-12 object-contain"
                alt="card2"
              />
              <Image
                src={nagad}
                className="w-12 object-contain"
                alt="card3"
              />
            </label>
          </div>
        </div>
      </div>
      {
        error && <p className="text-sm mt-1 text-red-500">{error}</p>
      }
    </div>
  )
}

export default TabCart