'use client'
import { HomeIcon, ShoppingBag, TreePalm, UserRoundSearch, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const path = usePathname();
  const [user, setUser] = useState<any>(null);;
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        console.log("data: ",data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [])


  if (!user) {
    return <div>
      <p>Loading...</p>
    </div>
  }


  return (
    <div className="flex h-screen flex-col justify-between border-e bg-gray-100 w-72 fixed">
      <div className="px-4 py-6">
        <div className="px-4 text-teal-500 flex items-center gap-2">
          <TreePalm size={26} /> <span className="text-2xl font-bold uppercase">Z-Krishi</span>
        </div>
        <hr className="mt-3 w-full h-[1.5px] bg-gray-300" />
        <ul className="mt-6 space-y-2">
          <li>
            <Link
              href="/admin/user-traffic"
              className={`block rounded-lg font-sans text-sm px-4 py-3 font-medium hover:bg-teal-500 hover:text-white ${
                path?.includes("/create") ? "bg-teal-600 text-white" : "text-gray-700"
              } flex items-center gap-2`}
            >
              <Users size={20} />User Traffic
            </Link>
          </li>
          <li>
            <Link
              href="/admin/manage-users"
              className={`block rounded-lg font-sans text-sm px-4 py-3 font-medium hover:bg-teal-500 hover:text-white ${
                path?.includes("/create") ? "bg-teal-600 text-white" : "text-gray-700"
              } flex items-center gap-2`}
            >
              <Users size={20} />Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/manage-products"
              className={`block rounded-lg font-sans text-sm px-4 py-3 font-medium hover:bg-teal-500 hover:text-white ${
                path?.includes("/create") ? "bg-teal-600 text-white" : "text-gray-700"
              } flex items-center gap-2`}
            >
              <ShoppingBag size={20} />Manage Products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/manage-community"
              className={`block rounded-lg font-sans text-sm px-4 py-3 font-medium hover:bg-teal-500 hover:text-white ${
                path?.includes("/create") ? "bg-teal-600 text-white" : "text-gray-700"
              } flex items-center gap-2`}
            >
              <UserRoundSearch size={20} />Manage Community
            </Link>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <ul className="px-4">
          <li>
            <Link href="/" className="rounded-lg px-4 py-3 font-medium hover:bg-teal-500 hover:text-white flex items-center gap-2 mb-4">
              <HomeIcon /> Home
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-2 bg-gray-200 p-4">
        {
          user && (
            <div className="cursor-pointer">
              <Image unoptimized src={user.image} alt="image" height={100} width={100} className="size-10 rounded-full object-cover" />
            </div>
          ) 
        }
          <div>
            <p className="text-xs">
              <strong className="block font-medium">{user.name}</strong>
              <span>{user.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
