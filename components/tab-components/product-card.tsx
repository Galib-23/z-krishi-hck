import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  productName: string;
  productType: string;
  productImage: string;
  productPrice: number;
  productId: string;
}

const ProductCard = ({
  productName,
  productImage,
  productPrice,
  productType,
  productId
}: ProductCardProps) => {
  return (
    <div className="w-full max-w-80 rounded-md border flex flex-col items-center shadow-md">
      <Image className="w-72 h-48 object-cover rounded-t-md" width={288} height={192} src={productImage} alt="productimage" />
      <div className="w-full p-4">
        <div className="flex justify-between">
          <h1 className="font-semibold text-black">{productName}</h1>
          <p className="text-xs flex items-center border border-purple-450 px-1 rounded-md text-purple-450 py-[2px]">{productType.toLowerCase()}</p>
        </div>
        <h4 className="text-sm text-gray-500"><span className="font-semibold text-gray-700">Price: </span>BDT {productPrice}.0</h4>
        <Link href={`/marketplace/${productId}`}>
          <button className="text-sm border border-teal-500 w-full py-2 mt-3 rounded-md hover:bg-teal-400">View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard