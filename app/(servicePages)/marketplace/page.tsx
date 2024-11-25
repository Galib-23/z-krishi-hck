"use client"
import AddItems from "@/components/tab-components/add-items"
import TabCart from "@/components/tab-components/tab-cart"
import TabProducts from "@/components/tab-components/tab-crops"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, PlusCircle, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const MarketPlace = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("CROP");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", value);
    router.replace(`?${queryParams.toString()}`);
  };

  return (
    <div className="flex justify-center md:mt-10 w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col items-center w-screen">
        <TabsList className=" z-50 flex flex-col justify-between md:flex-row md:space-x-2 bg-gray-200 p-2 rounded-lg h-fit w-full md:w-[800px] fixed">
          <div className="flex flex-wrap md:flex-row md:space-x-2 md:mr-0 mr-2 bg-gray-200">
            <Link href={'/'}>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 rounded-md">
                <ArrowLeft color="red" size={20} />
              </div>
            </Link>
            <TabsTrigger value="CROP" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Crops
            </TabsTrigger>
            <TabsTrigger value="FERTILIZER" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Fertilizers
            </TabsTrigger>
            <TabsTrigger value="UTILS" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Utils
            </TabsTrigger>
            <TabsTrigger value="SEED" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Seed
            </TabsTrigger>
          </div>
          <div className="flex gap-1 mt-2 md:mt-0">
            <TabsTrigger value="add-item" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 group relative">
              <PlusCircle size={20} />
              <p className="hidden group-hover:block absolute -top-5 -left-12 p-1 bg-slate-500 text-white rounded-md">Add Item</p>
            </TabsTrigger>
            <TabsTrigger value="cart" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 group relative">
              <ShoppingCart size={20} />
              <p className="hidden group-hover:block absolute -top-5 -left-12 p-1 bg-slate-500 text-white rounded-md">My Cart</p>
            </TabsTrigger>
            {/* <TabsTrigger value="menu" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 group relative">
              <MenuIcon size={20} />
              <p className="hidden group-hover:block absolute -top-5 -left-8 p-1 bg-slate-500 text-white rounded-md">Menu</p>
            </TabsTrigger> */}
          </div>
        </TabsList>
        <TabsContent value="CROP" className="mt-44 md:mt-24">
          <TabProducts productType="CROP" />
        </TabsContent>
        <TabsContent value="FERTILIZER" className="mt-44 md:mt-24">
          <TabProducts productType="FERTILIZER" />
        </TabsContent>
        <TabsContent value="UTILS" className="mt-44 md:mt-24">
          <TabProducts productType="UTILS" />
        </TabsContent>
        <TabsContent value="SEED" className="mt-44 md:mt-24">
          <TabProducts productType="SEED" />
        </TabsContent>
        <TabsContent value="add-item" className="mt-44 md:mt-20 w-full max-w-xl">
          <div className="mx-2 md:mx-0">
            <AddItems />
          </div>
        </TabsContent>
        <TabsContent value="cart" className="mt-44 md:mt-24">
          <TabCart />
        </TabsContent>
        {/* <TabsContent value="menu" className="mt-44 md:mt-24">

        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export default MarketPlace
