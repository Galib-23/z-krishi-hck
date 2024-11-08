import { Briefcase, ChartAreaIcon, Group, Search, ShoppingCart, Spade, Sprout, SunSnowIcon } from "lucide-react"
import ServiceCard from "./home-components/service-card"


const Services = () => {
  return (
    <div className="md:h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-5xl font-bold text-teal-500 mt-8 md:mt-0">Our Services</h1>
      <p className="text-gray-600 max-w-[700px] text-center mt-4 px-2">Z-Krishi offers a comprehensive suite of tools designed to support sustainable farming practices. Our AI-powered crop suggestion system provides tailored crop recommendations based on real-time data, helping farmers make informed planting decisions.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 text md:grid-cols-4 gap-6 mt-10">
        <ServiceCard 
          text="Detect Disease"
          Icon={Search}
          color="text-purple-400"
          link="/detect"
        />
        <ServiceCard 
          text="Learn Farming"
          Icon={Spade}
          link="/learn"
          color="text-cyan-400"
        />
        <ServiceCard 
          text="Weather Forecast"
          Icon={SunSnowIcon}
          link="/weather"
          color="text-red-400"
        />
        <ServiceCard 
          text="Manage Crops"
          link="/management"
          color="text-blue-400"
          Icon={ChartAreaIcon}
        />
        <ServiceCard 
          text="Crop Recommendation"
          Icon={Sprout}
          color="text-green-400"
          link="/recommendation"
        />
        <ServiceCard 
          text="Community Forum"
          Icon={Group}
          color="text-yellow-400"
          link="/community"
        />
        <ServiceCard 
          text="Marketplace"
          Icon={ShoppingCart}
          color="text-sky-400"
          link="/marketplace?tab=CROP"
        />
        <ServiceCard 
          text="Find Jobs"
          Icon={Briefcase}
          color="text-orange-400"
          link="/jobs"
        />
      </div>
    </div>
  )
}

export default Services