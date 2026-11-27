"use client";

import React from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const handleSignOut = async () => {
  await authClient.signOut();
};

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const User = session?.user;

  return (
    <main className="min-h-screen bg-red-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        {/* heading */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-2xl font-bold text-green-800 sm:text-3xl lg:text-4xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-green-900 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য দেখুন
          </p>
        </div>

        {/* profile card */}
        <section className="overflow-hidden rounded-2xl border border-green-700/20 bg-white shadow-lg">
          {/* green cover */}
          <div className="h-20 bg-green-700 sm:h-28" />

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            {/* avatar overlaps the cover */}
            <div className="-mt-12 flex justify-center sm:-mt-14">
              <Image
                src={User?.image || "/bazar.png"}
                alt={User?.name || "avatar"}
                width={112}
                height={112}
                unoptimized
                className="h-24 w-24 rounded-full border-4 border-white bg-green-100 object-cover shadow-md ring-2 ring-green-700 sm:h-28 sm:w-28"
              />
            </div>

            {isPending ? (
              <p className="mt-6 text-center text-green-700">লোড হচ্ছে...</p>
            ) : (
              <>
                <h2 className="mt-4 text-center text-xl font-bold text-green-900 sm:text-2xl">
                  {User?.name}
                </h2>

                {/* info rows */}
                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-green-700/20 bg-red-100 px-4 py-3">
                    <p className="text-xs text-green-700 sm:text-sm">নাম</p>
                    <p className="break-words text-sm font-semibold text-green-900 sm:text-base">
                      {User?.name}
                    </p>
                  </div>

                  <div className="rounded-xl border border-green-700/20 bg-red-100 px-4 py-3">
                    <p className="text-xs text-green-700 sm:text-sm">ইমেইল</p>
                    <p className="break-all text-sm font-semibold text-green-900 sm:text-base">
                      {User?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="mt-6 w-full rounded-lg bg-green-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:text-base"
                >
                  সাইন আউট
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;