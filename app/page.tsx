import Banner from "@/components/home/banner";
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
    </div>
  );
}
