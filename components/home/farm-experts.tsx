import Image from "next/image";
import expert1 from "@/public/images/expert1.jpg";
import expert2 from "@/public/images/expert2.jpg";
import expert3 from "@/public/images/expert-3.jpg";
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const FarmExperts = () => {
  return (
    <div className='md:h-screen flex flex-col items-center bg-white'>
      <h1 className='text-2xl md:text-5xl font-bold text-teal-500 mt-6 md:mt-0 px-2 md:px-0'>Meet Our Farm Experts</h1>
      <p className="mt-4 max-w-[620px] text-center px-2 md:px-0">Everything melancholy uncommonly but solicitude inhabiting
        projection off. Connection stimulated estimating.</p>
      <div className="flex flex-col gap-8 md:flex-row mt-12">
        <div className="w-[250px] md:w-[300px] relative group overflow-hidden cursor-pointer">
          <Image src={expert1} alt="exp 1" />
          <div className="absolute opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 bottom-0 transition duration-700 z-30">
            <Contact />
          </div>
          <div className="absolute text-right bottom-0 right-0 bg-gradient-to-tl from-slate-700 to-transparent bg-opacity-45 w-full p-2 text-white">
            <h2 className="text-lg font-semibold">David Smith</h2>
            <p className="text-sm">Organic Researcher, Scientist</p>
          </div>
        </div>
        <div className="w-[250px] md:w-[300px] relative group overflow-hidden cursor-pointer">
          <Image src={expert2} alt="exp 1" />
          <div className="absolute opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 bottom-0 transition duration-700 z-30">
            <Contact />
          </div>
          <div className="absolute text-right bottom-0 right-0 bg-gradient-to-tl from-slate-700 to-transparent bg-opacity-45 w-full p-2 text-white">
            <h2 className="text-lg font-semibold">Maria bill</h2>
            <p className="text-sm">Seed Researcher, MIT</p>
          </div>
        </div>
        <div className="w-[250px] md:w-[300px] relative group overflow-hidden cursor-pointer">
          <Image src={expert3} alt="exp 1" />
          <div className="absolute opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 bottom-0 transition duration-700 z-30">
            <Contact />
          </div>
          <div className="absolute text-right bottom-0 right-0 bg-gradient-to-tl from-slate-700 to-transparent bg-opacity-45 w-full p-2 text-white">
            <h2 className="text-lg font-semibold">William Henry</h2>
            <p className="text-sm">Harvest analyst, Harvard</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmExperts


const Contact = () => {
  return (
    <div>
      <div className="bg-blue-300 p-4 w-12">
        <LinkedInLogoIcon color="blue" />
      </div>
      <div className="bg-sky-400 p-4 w-12">
        <TwitterLogoIcon color="white" />
      </div>
      <div className="bg-red-300 p-4 w-12">
        <InstagramLogoIcon color="black" />
      </div>
    </div>
  )
}