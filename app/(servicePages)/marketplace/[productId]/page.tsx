"use client"
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async (productId: string) => {
      setLoading(true);
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        setError(true);
      }
      const data = await res.json();
      setProduct(data);
      console.log(data);
      setLoading(false);
    };
    fetchProduct(productId as string);
  }, [productId])
  if (loading || !product) {
    return (
      <p>Loading...</p>
    )
  }

  const handlePurchase = async () => {
    const { value: quantity } = await Swal.fire({
      title: "Enter Quantity",
      input: "number",
      inputLabel: "Quantity",
      inputPlaceholder: "Enter Quantity",
    });
    if (quantity) {
      if (quantity > product?.productRemaining) {
        Swal.fire({
          icon: "error",
          title: "Invalid Quantity.",
          text: "Quantity must be less than remaining products",
        });
      } else {
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
          });

          if (!res.ok) throw new Error('Failed to add item to cart');

          const data = await res.json();
          if (res.ok) {
            router.push('/marketplace?tab=cart')
          } else {
            router.refresh();
          }
          console.log(data.message);
        } catch (error: any) {
          console.error(error);
          setError(error.message);
        }
      }
    }
  }

  return (
    <div className='w-full flex justify-center mx-auto'>
      <div className='min-h-screen max-w-5xl flex flex-col md:flex-row items-center md:gap-10 mt-2'>
        {
          product?.productImage && (
            <Image
              className='w-[300px] md:w-[400px] object-cover rounded-md border-2 border-gray-600 shadow-md'
              src={product.productImage}
              width={500}
              height={500}
              alt='product Image'
            />
          )
        }
        <div className='flex flex-col items-center md:items-start space-y-3'>
          <h2 className='text-xl md:text-4xl font-bold'>{product.productName}</h2>
          <p className="text-xs flex items-center border border-purple-450 px-1 rounded-md text-purple-450 py-[2px]">{product.productType.toLowerCase()}</p>
          <h4 className="text-gray-500"><span className="font-semibold text-gray-700">Price: </span>BDT {product.productPrice}</h4>
          <p className='text-gray-5600'>{product.productDescription}</p>
          <p className='text-gray-500'><span className="font-semibold text-gray-700">Total Sold:</span> {product.totalSold}</p>
          <p className='text-gray-500'><span className='font-semibold text-gray-700'>Product Remaining: </span>{product.productRemaining}</p>
          <button onClick={handlePurchase} className='bg-teal-450 rounded-md py-2 px-3 hover:bg-teal-500 shadow-md'>Purchase</button>
          {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails