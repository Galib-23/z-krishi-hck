import Link from "next/link";
import UserButton from "./user-button";
import getSession from "@/lib/getSession";
import ZKrishi from "@/assets/logos/zkrishi";

export default async function NavBar() {
  const session = await getSession();
  const user = session?.user;

  console.log("Sess: ", session)

  return (
    <header className="fixed z-50 top-0 bg-transparent px-3 shadow-lg w-full">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <nav className="mx-auto relative z-50 flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 ">
          <ZKrishi />
          <h2 className="text-2xl font-semibold text-teal-450">Z-Krishi</h2>
        </Link>   
        <div className="flex items-center gap-6">
        <Link href="/about-us">
          <h2 className=" text-white p-2 rounded-md hover:bg-teal-450 hover:text-black">About Us</h2>
        </Link>  
        <Link href="/pricing">
          <h2 className=" text-white p-2 rounded-md hover:bg-teal-450 hover:text-black">Pricing</h2>
        </Link>  
        <Link href="/contact-us">
          <h2 className=" text-white p-2 rounded-md hover:bg-teal-450 hover:text-black">Contact Us</h2>
        </Link>  
        <Link href="/testimonials">
          <h2 className=" text-white p-2 rounded-md hover:bg-teal-450 hover:text-black">Testimonials</h2>
        </Link>  
        </div>
        {
          user ? (
            <div className="cursor-pointer">
              <UserButton />
            </div>
          ) : <Link href={"/signin"}>
              <button className="bg-teal-400 shadow-md text-black px-3 py-2 rounded-lg hover:bg-teal-700 hover:text-white transition">
                Sign In
              </button>
            </Link>
        }
      </nav>
    </header>
  );
}