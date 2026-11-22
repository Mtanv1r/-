import Allthings from "@/components/allthings";
import Banner from "@/components/banner";
import UpDown from "@/components/UpDown";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto" >
    <Banner></Banner>
    <UpDown></UpDown>
    <Allthings></Allthings>
    </div>
  );
}
