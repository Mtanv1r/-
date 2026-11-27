import React from 'react';

const page = async ({params}) => {


    const {id} = await params
    const res=await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
    const data = await res.json()
    console.log(data)
    return (
        <div>
            {/* product info */}
         <section>
            <h1>{data.nameBn}</h1>
            <p>প্রতি {data.unit} {data.categoryNameBn
}</p>

<div>
    <h1>আজেকের দাম</h1>
    {data.
today} টাকা / {data.unit}

</div>


         </section>
        </div>
    );
};

export default page;


// import React from 'react';

// const page = async ({params}) => {


//     const {id} = await params
//     const res=await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
//     const data = await res.json()
//     console.log(data)
//     return (
//         <div>
//             {/* product info */}
//          <section>
//             <h1>{data.nameBn}</h1>
//             <p>প্রতি {data.unit} {data.categoryNameBn
// }</p>

// <div>
//     <h1>আজেকের দাম</h1>
//     {data.
// today} টাকা / {data.unit}

// </div>


//          </section>
//         </div>
//     );
// };

// export default page;

// in data there comes a object 

// 1. category: "mach"
// 2. categoryIcon: "🐟"
// 3. categoryNameBn: "মাছ"
// 4. change: {dir: 'up', pct: 4.5}
// 5. id: 17
// 6. image: "🐟"
// 7. lastMonth: 40
// 8. lastWeek: 42
// 9. markets: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 10. nameBn: "রুই মাছ"
// 11. slug: "rui-mach"
// 12. today: 46
// 13. unit: "kg"
// 14. yesterday: 44