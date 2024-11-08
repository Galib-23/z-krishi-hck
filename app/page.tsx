import Banner from "@/components/home/banner";
import FarmExperts from "@/components/home/farm-experts";
import Services from "@/components/home/services";
import WhyUs from "@/components/home/why-us";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Banner />
      <Services />
      <WhyUs />
      <FarmExperts />
      <p></p>
    </div>
  );
}
