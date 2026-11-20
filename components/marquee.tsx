import { spans } from 'next/dist/build/webpack/plugins/profiling-plugin';
import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"



const marquee =  async () => {
    const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    console.log(data)

    // to conver in bangla 
    const toBn = (num: number, digits = 0) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: digits,
  }).format(num);
    


    return (
     <div>
            <MarqueeText duration={20} className="bg-emerald-400">
  {data.map((elm) => {
    const dir = elm.change.dir;

    return (
      <span
        key={elm.id}
         className="mx-2 inline-flex items-center gap-1.5 rounded-full  bg-green-400/70 px-3 py-1 text-sm text-green-900 sm:mx-3 sm:gap-2 sm:px-4 sm:text-base"
      >
        <span>{elm.image}</span>
        <span className="font-semibold">{elm.nameBn}</span>
        <span>৳{toBn(elm.today)}/কেজি</span>

        {dir === "up" && (
          <span className="font-medium text-red-700">
            📈 {toBn(Math.abs(elm.change.pct))}%
          </span>
        )}
        {dir === "down" && (
          <span className="font-medium text-green-700">
            📉 {toBn(Math.abs(elm.change.pct))}%
          </span>
        )}
        {dir === "flat" && <span className="text-gray-600">➖</span>}

        <span>📢</span>
      </span>
    );
  })}
</MarqueeText>
     </div>
   
           
       
    );
};

export default marquee;