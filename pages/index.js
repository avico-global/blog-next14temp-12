import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "@/components/container/banner/Banner";
import Latest from "@/components/home/Latest";
import Popular from "@/components/home/Popular";
import Lifestyle from "@/components/home/Lifestyle";
import Fromtheblog from "@/components/home/Fromtheblog";
import Footer from "@/components/container/footer/Footer";
import data from "@/jason/banner.json";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner data={data} />
      <Latest/>
      <Popular/>
      <Lifestyle/>
      <Fromtheblog/>
      <Footer/>
    </div>
  );
}
