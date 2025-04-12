"use client";

import dynamic from "next/dynamic";

// Dynamically import lottie-react with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieWrapper = ({ animationData }: { animationData: any }) => {
  return <Lottie animationData={animationData} loop={true} className="h-[60vh]" />;
};

export default LottieWrapper;
