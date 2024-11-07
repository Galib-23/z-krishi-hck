"use client"
import Lottie from 'lottie-react'
import bannerFarmer from "@/assets/animations/bannerFarmer.json";

const BannerLottie = () => {
  return (
    <div className="w-56 md:w-[550px]">
        <Lottie animationData={bannerFarmer} loop={true}/>
      </div>
  )
}

export default BannerLottie