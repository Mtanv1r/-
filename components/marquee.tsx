import React from 'react';

const marquee =  async () => {
    const res=await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    


    return (
        <div>
            <h1>this is marquee section</h1>
        </div>
    );
};

export default marquee;