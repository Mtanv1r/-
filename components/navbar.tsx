"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const formatBangla = (d: Date) => {
  const dayName = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    timeZone: "Asia/Dhaka",
  }).format(d);

  const date = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(d);

  return { dayName, date };
};

const Navbar = () => {
  // null on first render avoids server/client hydration mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect( ()  => {
    setNow(new Date());
    // re-check every minute so the date rolls over at midnight
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const { dayName, date } = now
    ? formatBangla(now)
    : { dayName: "", date: "" };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-300 shadow-md">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo + title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-700 sm:h-12 sm:w-12">
            <Image
              src="/logo-icon.png"
              width={50}
              height={30}
              alt="বাজার দর লোগো"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <h1 className="text-lg font-bold text-green-800 sm:text-xl lg:text-2xl">
            বাজার দর
          </h1>
        </div>

        {/* Bangla date section: full row on mobile, centered on larger screens */}
        <div
          className="order-3 flex w-full items-center justify-center gap-2 rounded-full border border-green-700/30 bg-white/60 px-4 py-1 text-sm text-green-900 md:order-none md:w-auto md:text-base"
          aria-live="polite"
        >
          <span className="h-2 w-2 rounded-full bg-green-700" aria-hidden="true" />
          {now ? (
            <>
              <span className="font-semibold">{dayName}</span>
              <span className="text-green-700">|</span>
              <span>{date}</span>
            </>
          ) : (
            <span className="opacity-0">লোড হচ্ছে</span>
          )}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-lg border border-green-700 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white sm:px-4 sm:text-base">
            সাইন ইন
          </button>
          <button className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-base">
            সাইন আপ
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;