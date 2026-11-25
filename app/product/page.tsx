import React from "react";

// http://localhost:3000/product?category=mosla
type Props = {
  searchParams: Promise<{ category?: string }>;
};

type PriceChange = {
  dir: "up" | "down";
  pct: number | string;
};

type Product = {
  id?: string | number;
  nameBn: string;
  image?: string;
  today: number | string;
  unit: string;
  categoryNameBn: string;
  categoryIcon: string;
  change?: PriceChange;
};

/* ───────── Bangla numeral helper (keeps decimals: 12.5 → ১২.৫) ───────── */
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (value: number | string): string =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/* ───────── data ───────── */
async function getProducts(category?: string): Promise<Product[]> {
  if (!category) return [];
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(
        category
      )}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return [];
    const json: unknown = await res.json();
    return Array.isArray(json) ? (json as Product[]) : [];
  } catch {
    return [];
  }
}

const isUrl = (s?: string) => !!s && /^(https?:)?\/\//.test(s);

const Page = async ({ searchParams }: Props) => {
  const { category } = await searchParams;
  const data = await getProducts(category);

  // min-h keeps the footer from jumping between categories with few/many items
  return (
    <main className="relative z-0 mx-auto w-full max-w-5xl min-h-[75vh] px-3 py-4 sm:px-4 sm:py-6">
      {data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি
        </p>
      ) : (
        <>
          {/* ───────── Section 1: category header ───────── */}
          <section className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
              {data[0].categoryIcon}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-gray-800 sm:text-2xl">
                {data[0].categoryNameBn}
              </h1>
              <p className="text-xs text-gray-500 sm:text-sm">
                মোট{" "}
                <span className="font-semibold text-gray-800">
                  {toBn(data.length)}টি
                </span>{" "}
                পণ্যের আজকের দামের পরিবর্তন
              </p>
            </div>
          </section>

          {/* ───────── Section 2: products ───────── */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {data.map((elm, idx) => {
              const isUp = elm.change?.dir === "up";

              return (
                <article
                  key={elm.id ?? idx}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                      {isUrl(elm.image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={elm.image}
                          alt={elm.nameBn}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        elm.image
                      )}
                    </div>
                    <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-800 sm:text-base">
                      {elm.nameBn}
                    </h2>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] text-gray-500 sm:text-xs">
                        আজকের দাম
                      </p>
                      <p className="text-base font-bold text-gray-900 sm:text-xl">
                        ৳{toBn(elm.today)}
                      </p>
                      <p className="text-[11px] text-gray-500 sm:text-xs">
                        প্রতি {elm.unit}
                      </p>
                    </div>

                    {elm.change && (
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-semibold text-white sm:text-xs ${
                          isUp ? "bg-red-600" : "bg-blue-500"
                        }`}
                      >
                        {isUp ? "📈" : "📉"} {toBn(elm.change.pct)}%
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
};

export default Page;
