import React from 'react';









const UpDown =  async () => {




       const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    // console.log(data)
    // console.log(data) main array 
    const upPdt=data.filter(elm=>elm.change.dir === "up").sort((a,b)=>a.change.pct-b.change.pct).reverse()
    // console.log(upPdt)
      const dwnPdt=data.filter(elm=>elm.change.dir === "down").sort((a,b)=>a.change.pct-b.change.pct)
      console.log(dwnPdt)
    
  
    



    return (
       <section className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
  <h1 className="mb-4 text-xl font-bold text-green-800 sm:text-2xl lg:text-3xl">
    আজকে দাম বেড়েছে 📈
  </h1>

  {/* up price product section */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
    {upPdt.map((elm, idx) => (
                            <div
  key={idx}
  className="flex flex-col gap-3 rounded-2xl border border-green-700/20 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <div className="flex items-center gap-3">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-700 text-2xl">
      {elm.image}
    </span>
    <div>
      <h1 className="text-base font-bold text-green-900 sm:text-lg">{elm.nameBn}</h1>
      <h1 className="text-xs text-green-700 sm:text-sm">{elm.unit}</h1>
    </div>
  </div>

  <div className="flex items-end justify-between border-t border-green-700/10 pt-3">
    <p className="text-sm text-gray-600">
      আজকের দাম <span className="block text-xl font-bold text-green-800 sm:text-2xl">৳{elm.today}</span>
    </p>
    <h1 className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800 sm:text-sm">
      🔺{elm.change.pct}%
    </h1>
  </div>
</div>
    ))}
  </div>
</section>
    );
};

export default UpDown;



