"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Userinfo = () => {
  const { data: session } = authClient.useSession();
  const User = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // logged out: sign in / sign up buttons
  if (!User) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/signin">
          <button className="rounded-lg border border-green-700 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-700 hover:text-white sm:px-4 sm:text-base">
            সাইন ইন
          </button>
        </Link>
        <Link href="/signup">
          <button className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4 sm:text-base">
            সাইন আপ
          </button>
        </Link>
      </div>
    );
  }

  // logged in: avatar + name + dropdown arrow, menu shows on hover
  return (
    <div className="group relative" tabIndex={0}>
      {/* trigger: avatar + name + arrow (no button design) */}
      <div className="flex cursor-pointer items-center gap-2">
        <Image
          src={User.image || "/bazar.png"}
          alt={User.name}
          width={40}
          height={40}
          unoptimized
          className="h-8 w-8 rounded-full object-cover ring-2 ring-green-700 sm:h-10 sm:w-10"
        />
        <span className="hidden max-w-[120px] truncate text-sm font-semibold text-green-900 sm:block sm:text-base lg:max-w-[180px]">
          {User.name}
        </span>
        <svg
          className="h-4 w-4 text-green-700 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* hover menu: pt-2 keeps the hover area connected to the trigger */}
      <div className="invisible absolute right-0 top-full z-50 w-56 pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 sm:w-64">
        <div className="overflow-hidden rounded-xl border border-green-700/20 bg-white shadow-lg">
          {/* user info */}
          <div className="border-b border-green-700/10 bg-red-100 px-4 py-3">
            <p className="truncate text-sm font-bold text-green-900 sm:text-base">
              {User.name}
            </p>
            <p className="truncate text-xs text-green-700 sm:text-sm">
              {User.email}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-3">
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2 text-sm font-medium text-green-900 transition hover:bg-green-100 sm:text-base"
            >
              আমার প্রোফাইল
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-800 sm:text-base"
            >
              সাইন আউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;