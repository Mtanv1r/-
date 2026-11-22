import React from 'react';

const allthings = async () => {
      const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    // console.log(data)



    return (
        <div>
            <h1>সবকিছুর দাম একসাথে</h1>
            
        </div>
    );
};

export default allthings;