"use client";
import dynamic from "next/dynamic";
import bannerFarmer from "@/assets/animations/bannerFarmer.json";
import recommendationPageAnimation from "@/assets/animations/recommendationpage.json";

// Load Lottie dynamically on client side only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export const BannerLottie = () => {
  return (
    <div className="w-56 md:w-[550px]">
      <Lottie animationData={bannerFarmer} loop />
    </div>
  );
};

export const RecommendLottie = () => {
  return (
    <div className="w-56 md:w-[550px]">
      <Lottie animationData={recommendationPageAnimation} loop />
    </div>
  );
};
