
import React from "react";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};


// searchparams কারন slug বেবহার করি নি
// http://localhost:3000/product?category=mosla
const Page = async ({ searchParams }: Props) => {
  const { category } = await searchParams;

  console.log(category);

  const res= await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${category}`)
  const data =await res.json()
  console.log(data)

  return (
    <div>
      {category}
    </div>
  );
};

export default Page;
