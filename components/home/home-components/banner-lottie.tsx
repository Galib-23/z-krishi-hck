"use client"
import Lottie from 'lottie-react'
import bannerFarmer from "@/assets/animations/bannerFarmer.json";
import recommendationPageAnimation from '@/assets/animations/recommendationpage.json';

export const BannerLottie = () => {
  return (
    <div className="w-56 md:w-[550px]">
        <Lottie animationData={bannerFarmer} loop={true}/>
      </div>
  )
}

export const RecommendLottie = () => {
  return (
    <div className="w-56 md:w-[550px]">
        <Lottie animationData={recommendationPageAnimation} loop={true}/>
      </div>
  )
}