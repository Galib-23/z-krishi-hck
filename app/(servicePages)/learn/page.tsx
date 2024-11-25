"use client";
import Blogs from "@/components/learn-tab-components/blogs";
import CreateBlog from "@/components/learn-tab-components/create-blog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LearnFarming = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("blogs");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update the URL with the new tab value without reloading the page
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", value);
    router.replace(`?${queryParams.toString()}`); // Use `replace` to update the URL
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
            <TabsTrigger value="blogs" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Blogs
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="simulation" className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
              Simulation
            </TabsTrigger>
          </div>
          <div className="flex gap-1 mt-2 md:mt-0">
            <TabsTrigger value="create-blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 group relative">
              <PlusCircle size={20} />
              <p className="hidden group-hover:block absolute -top-5 -left-12 p-1 bg-slate-500 text-white rounded-md">Create Blog</p>
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="blogs" className="mt-44 md:mt-24">
          <Blogs />
        </TabsContent>
        <TabsContent value="tutorials" className="mt-44 md:mt-24">
          
        </TabsContent>
        <TabsContent value="simulation" className="mt-44 md:mt-24">
          
        </TabsContent>
        <TabsContent value="create-blog" className="mt-44 md:mt-20 w-full max-w-xl">
          <div className="mx-2 md:mx-0">
            <CreateBlog />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnFarming;
