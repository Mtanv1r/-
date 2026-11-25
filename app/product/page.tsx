
import { Elms_Sans } from "next/font/google";
import React from "react";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};


// search params কারন slug বেবহার করি নি
// http://localhost:3000/product?category=mosla
const Page = async ({ searchParams }: Props) => {
  const { category } = await searchParams;


  const res= await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${category}`)
  const data =await res.json()
  console.log(data)

  return (
    <>
    <div className="flex border-2">
      <section>
        {/* this is categoryname and section */}
         {
        data[0].categoryIcon
      }
      </section>
      <h1>{data[0].categoryNameBn
}</h1>
<h1>মোট {data.length}টি পণ্য এর আজকের দেমার পরিবর্তন</h1>
    </div>

    {/* single product will be here  */}
      <div>
  {
    data.map((elm,idx)=>{
      return(
        <section key={idx}>
          <section>
            {/* card will be here */}
            <div>
              {elm.image}
              {elm.nameBn}
              <h1>  আজকের দাম={elm.today}</h1>
             
              <h1>প্রতি{elm.unit}</h1>
            </div>
            {/* conditional section */}
            <div>
              
            </div>
          </section>

        </section>
      )
    })
  }
    </div>
    </>
   
  );
};

export default Page;
