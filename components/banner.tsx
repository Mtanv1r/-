"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const fmt = (d: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("bn-BD", { timeZone: "Asia/Dhaka", ...options }).format(d);

const Banner = () => {
  // null on first render avoids server/client hydration mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    // re-check every minute so the date rolls over at midnight
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const dateItems = now
    ? [
        { label: "বার", value: fmt(now, { weekday: "long" }) },
        { label: "তারিখ", value: fmt(now, { day: "numeric" }) },
        { label: "মাস", value: fmt(now, { month: "long" }) },
        { label: "সাল", value: fmt(now, { year: "numeric" }) },
      ]
    : [];

  return (
    <section className="w-full bg-red-100">
      <div className="container mx-auto flex flex-col-reverse items-center gap-8 px-4 py-8 sm:px-6 md:flex-row md:justify-between md:gap-10 md:py-12 lg:px-8 lg:py-16">
        {/* left section */}
        <div className="flex w-full flex-col items-center gap-4 text-center md:w-1/2 md:items-start md:text-left">
          {/* time block */}
          <div
            className="grid min-h-[64px] w-full max-w-md grid-cols-4 gap-2 sm:gap-3"
            aria-live="polite"
          >
            {dateItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-xl border border-green-700/30 bg-white/70 px-1 py-2 shadow-sm"
              >
                <span className="text-[10px] text-green-700 sm:text-xs">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-green-900 sm:text-base lg:text-lg">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold leading-tight text-green-800 sm:text-3xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-lg text-sm text-green-900 sm:text-base lg:text-lg">
            চাল, ডাল, মাছ, সবজি, গোশত — সবকিছুর আপডেট দাম এক নজরে দেখুন
          </p>

          <button className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-green-800 sm:px-6 sm:text-base">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* right section */}
        <div className="flex w-full justify-center md:w-1/2">
          <Image
            src="/bazar-hero.png"
            alt="বাজার ব্যানার"
            width={600}
            height={450}
            priority
            className="h-auto w-full max-w-xs rounded-2xl object-contain sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;