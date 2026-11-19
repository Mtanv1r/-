"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // copy from sign-up page 
     // user information getting ......`
    const formData= new FormData(e.target)
    const user=Object.fromEntries(formData.entries()) as {name:string,email:string,password:string}
    // console.log(user)
    const { data, error } = await authClient.signIn.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        // user display name
        // image, // User image URL (optional)
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    })
    if(data){
      console.log(data)
      // here will be a toast for successing the signup session 
      // redirect("/")
    }
    if(error){
      // here will be the error session 
      console.log(error)
    }




    // TODO: call your sign in here, for example with better-auth:
    // const { error } = await authClient.signIn.email({ email, password });
    // if (error) setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    console.log({ email, password });
  };

  const inputClass =
    "w-full rounded-lg border border-green-700/40 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30 sm:text-base";
  const labelClass = "mb-1 block text-sm font-medium text-green-900";

  return (
    <main className="flex min-h-screen items-center justify-center bg-red-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-red-200 p-6 shadow-lg sm:p-8">
        {/* Top text */}
        <h1 className="text-center text-2xl font-bold text-green-800 sm:text-3xl">
          সাইন ইন করুন
        </h1>
        <p className="mt-2 text-center text-sm text-green-900 sm:text-base">
          সাইন ইন করে বিস্তারিত দাম দেখুন
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-700">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 py-2.5 text-base font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন করুন
          </button>
        </form>

        {/* Bottom link */}
        <p className="mt-5 text-center text-sm text-green-900 sm:text-base">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 underline hover:text-green-900"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
      
    </main>
  );
};

export default SignInPage;