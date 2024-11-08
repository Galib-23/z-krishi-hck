import Image from 'next/image';
import BannerLottie from './home-components/banner-lottie'
import whyus from "@/public/images/whyus.png";

const WhyUs = () => {
  return (
    <div className='md:h-screen flex flex-col justify-center bg-white'>
      <div className='flex flex-col md:flex-row justify-evenly items-center'>
        {/* TEXTS */}
        <div className='space-y-3 max-w-[550px] z-20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-45 p-4'>
          <h1 className='text-2xl md:text-5xl font-bold text-teal-500 mt-6 md:mt-0 px-2 md:px-0'>Why Z-Krishi 🤔</h1>
          <ul className='text-sm space-y-2 px-2 md:px-0'>
            <li className='text-gray-800'><span className='font-semibold'>AI-Powered Crop Guidance: </span>Our system provides data-driven crop recommendations tailored to your unique farming conditions, helping you make informed decisions</li>
            <li className='text-gray-800'><span className='font-semibold'>Real-Time Weather Insights: </span> Stay ahead of the weather with live updates, allowing you to plan and protect your crops more effectively</li>
            <li className='text-gray-800'><span className='font-semibold'>Community Support: </span>Join a thriving community of farmers, share knowledge, and learn from others through our dedicated forum.</li>
            <li className='text-gray-800'><span className='font-semibold'>Eco-Friendly Marketplace: </span>Access a curated selection of organic and sustainable farming products designed to enhance productivity while protecting the environment.</li>
          </ul>
        </div>
        {/* ANIMATION */}
        <div className='z-20'>
          <BannerLottie />
        </div>
        <Image src={whyus} alt='whyus' className='absolute w-full object-cover hidden md:block' />
      </div>
    </div>
  )
}

export default WhyUs