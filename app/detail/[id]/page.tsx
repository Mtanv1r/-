import React from 'react';

const page = async ({params}) => {


    const {id} = await params
    const res=await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
    const data = await res.json()
    console.log(data)
    return (
        <div>
           {data.nameBn}
           {data.image}
        </div>
    );
};

export default page;