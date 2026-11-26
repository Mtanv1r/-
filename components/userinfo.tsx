"use client"


import React from 'react';
import Link from "next/link";
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const userinfo = () => {
    // here will be session 
    const {data : session} = authClient.useSession()
    // console.log(session)
    const User= session?.user
    // console.log(User)

    // for signout section 

    const handleSignOut = async ()=>{
        await authClient.signOut();
    }





    return (
        <div>{
            User?(
  //   <div className="flex items-center gap-2 sm:gap-3">
  //     {/* Avatar */}
  //     <Image
  //       src="/bazar.png"
  //       alt={User.name}
  //       width={40}
  //       height={40}
  //       className="h-8 w-8 rounded-full object-cover ring-2 ring-green-700 sm:h-10 sm:w-10"
  //     />

  //     {/* Name */}
  //     <h1 className="max-w-[80px] truncate text-sm font-semibold text-green-900 sm:max-w-[140px] sm:text-base lg:max-w-[200px]">
  //       {User.name}
  //     </h1>

  //     {/* Sign out */}
  //     <button
  //       className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-base"
  //       onClick={handleSignOut}
  //     >
  //       সাইন আউট
  //     </button>
  //   </div>
  // )
  <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn m-1">Hover</div>
  <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>
      {/* profile section */}

           <div className="flex items-center gap-2 sm:gap-3">
       {/* Avatar */}
     <Image
        src="/bazar.png"
        alt={User.name}
        width={40}
        height={40}
        className="h-8 w-8 rounded-full object-cover ring-2 ring-green-700 sm:h-10 sm:w-10"
      />

      {/* Name */}
      <h1 className="max-w-[80px] truncate text-sm font-semibold text-green-900 sm:max-w-[140px] sm:text-base lg:max-w-[200px]">
        {User.name}
      </h1>
      </div>
      </a></li>


    <li><a>
      {/* signOut section */}
       <button
        className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-base"
        onClick={handleSignOut}
      >
        সাইন আউট
      </button>
   
      
      </a>
      </li>
  </ul>
</div>)
            
            :

            
            <div className="flex items-center gap-2 sm:gap-3">
          <Link href={"/signin"}>
          <button className="rounded-lg border border-green-700 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white sm:px-4 sm:text-base">
            সাইন ইন
          </button>
          </Link>
        <Link href={"/signup"}>
         <button className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-base">
            সাইন আপ
          </button>
        </Link>
         
        </div>
            }
        </div>
    );
};

export default userinfo;