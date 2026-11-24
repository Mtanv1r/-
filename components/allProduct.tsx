import Link from "next/link";
import React from "react";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const AllProduct = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );
  const data: Category[] = await res.json();
  // console.log(data)

  return (
    <section className="w-full shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* scrolls sideways on small screens, centered on large screens */}
        <ul className="flex items-center gap-2 overflow-x-auto py-2 sm:gap-3 lg:justify-center [&::-webkit-scrollbar]:hidden">
          {data.map((elm,idx) => (
            <Link key={idx} href={`/product?category=${elm.id}`}>
                 <li
              key={elm.id}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-green-700/30 bg-white/70 px-3 py-1.5 text-sm font-medium text-green-900 transition hover:bg-green-700 hover:text-white sm:px-4 sm:text-base"
            >
              <span aria-hidden="true">{elm.icon}</span>
              <span className="whitespace-nowrap">{elm.nameBn}</span>
            </li>
            </Link>
           
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AllProduct;