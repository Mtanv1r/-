import React from 'react';

const UpDown =  async () => {
       const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    // console.log(data)
    



    return (
        <div>
            <h1>আজকে দাম বেড়েছে</h1>
                 <h1>আজকে দাম কমেছে</h1>
        </div>
    );
};

export default UpDown;