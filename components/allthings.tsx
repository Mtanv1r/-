import React from "react";
import UpPrice from "./cards/upPrice";
import DownPrice from "./cards/downPrice";

const Allthings = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const data = await res.json();

  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* heading: dark green band so the white-to-green gradient text stays readable */}
      <div className="mb-8 flex justify-center">
        <div className="rounded-2xl bg-green-800 px-6 py-3 shadow-lg sm:px-10 sm:py-4">
          <h1 className="bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-center text-2xl font-extrabold text-transparent sm:text-3xl lg:text-4xl">
            সবকিছুর দাম একসাথে
          </h1>
        </div>
      </div>

      {/* cards grid: 1 col on phones, 2 from sm, 3 from lg */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {data.map((elm) =>
          elm.change.dir === "up" ? (
            <UpPrice key={elm.id} elm={elm} />
          ) : elm.change.dir === "down" ? (
            <DownPrice key={elm.id} elm={elm} />
          ) : null
        )}
      </div>
    </section>
  );
};

export default Allthings;