import React from 'react';
import UpPrice from './cards/upPrice';
import DownPrice from './cards/downPrice';





const UpDown = async () => {
  
   const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    // console.log(data)
    // console.log(data) main array 
    const upPdt=data.filter(elm=>elm.change.dir === "up").sort((a,b)=>a.change.pct-b.change.pct).reverse().slice(0,6)
  
      const dwnPdt=data.filter(elm=>elm.change.dir === "down").sort((a,b)=>a.change.pct-b.change.pct).slice(0,6)
      // console.log(dwnPdt)



  return (
    <div>

      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
  {/* heading */}
  <div className="mb-8 flex flex-col items-center gap-2 text-center">
    <h1 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-700 px-5 py-2 text-lg font-bold text-white shadow-lg sm:px-8 sm:py-3 sm:text-2xl lg:text-3xl">
      <span className="animate-bounce">🔺</span>
      আজকে দাম বেড়েছে
      <span className="animate-bounce">🔺</span>
    </h1>
    <span className="h-1 w-24 rounded-full bg-green-700 sm:w-32" />
  </div>

  {/* cards grid */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
    {upPdt.map((elm) => (
      <UpPrice elm={elm} key={elm.id} />
    ))}
  </div>
</section>
{/* price down section */}
      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
  {/* heading */}
  <div className="mb-8 flex flex-col items-center gap-2 text-center">
    <h1 className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-blue-700 px-5 py-2 text-lg font-bold text-white shadow-lg sm:px-8 sm:py-3 sm:text-2xl lg:text-3xl">
      <span className="animate-bounce">📉</span>
      আজকে দাম কমেছে
      <span className="animate-bounce">📉</span>
    </h1>
    <span className="h-1 w-24 rounded-full bg-green-700 sm:w-32" />
  </div>

  {/* cards grid */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
    {dwnPdt.map((elm,idx) => (
      <DownPrice key={idx} elm={elm}></DownPrice>
    ))}
  </div>
</section>


    </div>
  );
};

export default UpDown;






