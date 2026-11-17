"use client"


import React from 'react';
import Link from "next/link";
import { authClient } from '@/lib/auth-client';

const userinfo = () => {
    // here will be session 
    const {data : session} = authClient.useSession()
    // console.log(session)
    const User= session?.user
    console.log(User)





    return (
        <div>{
            User?<div>

                {
                    
                    User.name
                }
            </div>
            
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