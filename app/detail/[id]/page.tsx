import React from "react";
import { notFound } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (num: number, digits = 0) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: digits }).format(num);

const trendStyle = {
  up: { icon: "🔺", label: "বেড়েছে", badge: "bg-red-100 text-red-700" },
  down: { icon: "🔻", label: "কমেছে", badge: "bg-green-100 text-green-700" },
  flat: { icon: "➖", label: "অপরিবর্তিত", badge: "bg-gray-100 text-gray-600" },
};

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`
  );
  if (!res.ok) notFound();
  const data: Product = await res.json();

  const unit = unitBn[data.unit] ?? data.unit;
  const t = trendStyle[data.change.dir] ?? trendStyle.flat;
  const diff = Math.abs(data.today - data.yesterday);

  // ---- section 2: price summary across all markets ----
  const highest = Math.max(...data.markets.map((m) => m.max));
  const lowest = Math.min(...data.markets.map((m) => m.min));
  // average of each market's own average ((min + max) / 2)
  const average =
    data.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
    data.markets.length;

  const stats = [
    { label: "সর্বোচ্চ দাম", value: highest, icon: "⬆️", color: "text-red-700" },
    { label: "সর্বনিম্ন দাম", value: lowest, icon: "⬇️", color: "text-green-700" },
    { label: "গড় দাম", value: average, icon: "📊", color: "text-green-900" },
  ];

  // ---- section 3: group markets by division ----
  const byDivision = data.markets.reduce<Record<string, Market[]>>((acc, m) => {
    (acc[m.division] ||= []).push(m);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-red-100 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="container mx-auto max-w-5xl space-y-6 sm:space-y-8">
        {/* ========== Section 1: product + today's change ========== */}
        <section className="overflow-hidden rounded-2xl border border-green-700/20 bg-white shadow-lg">
          <div className="h-3 bg-green-700 sm:h-4" />
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            {/* name */}
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                {data.image}
              </span>
              <div>
                <h1 className="text-2xl font-bold text-green-900 sm:text-3xl lg:text-4xl">
                  {data.nameBn}
                </h1>
                <p className="mt-1 text-sm text-green-700 sm:text-base">
                  প্রতি {unit} • {data.categoryIcon} {data.categoryNameBn}
                </p>
              </div>
            </div>

            {/* price + change */}
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="text-xs text-gray-500 sm:text-sm">আজকের দাম</p>
              <p className="text-3xl font-extrabold text-green-800 sm:text-4xl lg:text-5xl">
                ৳{toBn(data.today)}
                <span className="text-base font-medium text-green-700 sm:text-lg">
                  {" "}
                  / {unit}
                </span>
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${t.badge}`}
              >
                {t.icon} গতকালের চেয়ে{" "}
                {data.change.dir === "flat"
                  ? "দাম অপরিবর্তিত"
                  : `৳${toBn(diff)} (${toBn(Math.abs(data.change.pct), 1)}%) ${t.label}`}
              </span>
            </div>
          </div>
        </section>

        {/* ========== Section 2: highest / lowest / average ========== */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-green-800 sm:mb-4 sm:text-xl">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-green-700/20 bg-white p-4 text-center shadow-sm sm:p-6"
              >
                <p className="text-sm text-green-700 sm:text-base">
                  {s.icon} {s.label}
                </p>
                <p className={`mt-2 text-2xl font-bold sm:text-3xl ${s.color}`}>
                  ৳{toBn(s.value)}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">প্রতি {unit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== Section 3: all markets by division ========== */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-green-800 sm:mb-4 sm:text-xl">
            সব বাজারের দাম
          </h2>

          <div className="space-y-6">
            {Object.entries(byDivision).map(([division, markets]) => (
              <div key={division}>
                {/* division heading */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-green-700 px-4 py-1 text-sm font-semibold text-white sm:text-base">
                    📍 {division} বিভাগ
                  </span>
                  <span className="h-px flex-1 bg-green-700/30" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {markets.map((m) => (
                    <div
                      key={m.market}
                      className="rounded-xl border border-green-700/20 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <h3 className="text-base font-bold text-green-900 sm:text-lg">
                        {m.market}
                      </h3>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-green-100 px-1 py-2">
                          <p className="text-[11px] text-green-700 sm:text-xs">
                            সর্বনিম্ন
                          </p>
                          <p className="text-sm font-bold text-green-800 sm:text-base">
                            ৳{toBn(m.min)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-red-100 px-1 py-2">
                          <p className="text-[11px] text-green-700 sm:text-xs">
                            গড়
                          </p>
                          <p className="text-sm font-bold text-green-900 sm:text-base">
                            ৳{toBn((m.min + m.max) / 2)}
                          </p>
                        </div>
                        <div className="rounded-lg bg-red-100 px-1 py-2">
                          <p className="text-[11px] text-red-700 sm:text-xs">
                            সর্বোচ্চ
                          </p>
                          <p className="text-sm font-bold text-red-700 sm:text-base">
                            ৳{toBn(m.max)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-2 text-right text-[11px] text-gray-500 sm:text-xs">
                        প্রতি {unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailPage;




