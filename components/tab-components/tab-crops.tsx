"use client"
import { useEffect, useState } from "react";
import ProductCard from "./product-card";

const TabProducts = ({productType}: any) => {
  
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.log('Product type:', productType);
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/products?productType=${productType}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        console.log('product', data);
        setProducts(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (productType) {
      getProducts();
    }
  }, [productType])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl">
      {
        products?.map((product: Record<string, any>) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            productName={product.productName}
            productType={product.productType}
            productImage={product.productImage}
            productPrice={product.productPrice}
          />
        ))
      }
      {
        error && <p className="text-sm mt-1 text-red-500">{error}</p>
      }
    </div>
  )
}

export default TabProducts