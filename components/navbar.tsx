import React from 'react';
import Image from 'next/image';

const navbar = () => {
    return (
        <div>
           <div >
            <div className="bg-green-700 h-10 w-10 rounded-2xl">
                <Image src={"/logo-icon.png"} width={50} height={30} alt="string">       
            </Image>
            </div>
             <h1>বাজার দর</h1> 
             {/* date section  */}
             {/* sign in sign up button will be added  */}
           </div>
        </div>
    );
};

export default navbar;