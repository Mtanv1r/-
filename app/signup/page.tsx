"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // user information getting ......`
    const formData= new FormData(e.target)
    const user=Object.fromEntries(formData.entries()) as {name:string,email:string,password:string}
    // console.log(user)
    const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        // image, // User image URL (optional)
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    })
    if(data){
       toast.success("সাইন আপ সফল হয়েছে",{
        duration:5000,
      })
      console.log(data)
      // here will be a toast for successing the signup session 
      redirect("/")
    }
    if(error){
      // here will be the error session 
       toast.error("সাইন আপ ভুল হয়েছে")
      console.log(error)
    }




    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    // TODO: call your sign up here, for example with better-auth:
    // await authClient.signUp.email({ name, email, password });
    console.log({ name, email, password });
  };

  const inputClass =
    "w-full rounded-lg border border-green-700/40 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/30 sm:text-base";
  const labelClass = "mb-1 block text-sm font-medium text-green-900";

  const handleGoogleSignup = async()=>{

     const data = await authClient.signIn.social({
    provider: "google",
  });

  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-red-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-red-200 p-6 shadow-lg sm:p-8">
        {/* Top text */}
        <h1 className="text-center text-2xl font-bold text-green-800 sm:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-center text-sm text-green-900 sm:text-base">
          বিনা খরচে সাইন আপ করে বিস্তারিত দাম দেখুন
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              নাম
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className={inputClass}
            />
          </div>

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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

       {/* divider */}
<div className="my-5 flex items-center gap-3">
  <span className="h-px flex-1 bg-green-700/30" />
  <span className="text-sm text-green-900">অথবা</span>
  <span className="h-px flex-1 bg-green-700/30" />
</div>

<button
  type="button"
  onClick={handleGoogleSignup}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-green-700/40 bg-white py-2.5 text-sm font-semibold text-green-900 transition hover:bg-green-50 sm:text-base"
>
  <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.100 0 24s.9 7.600 2.600 10.800l7.900-6.100z" />
    <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.600-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
  </svg>
  গুগল দিয়ে সাইন আপ করুন
</button>

        {/* Bottom link */}
        <p className="mt-5 text-center text-sm text-green-900 sm:text-base">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 underline hover:text-green-900"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;