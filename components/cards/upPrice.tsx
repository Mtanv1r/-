import React from "react";

type Product = {
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: { dir: string; pct: number };
};

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (num: number, digits = 0) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: digits }).format(num);

const UpPrice = ({ elm }: { elm: Product }) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-green-700/20 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* top: emoji + name + unit */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-700 text-2xl">
          {elm.image}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-green-900 sm:text-lg">
            {elm.nameBn}
          </h1>
          <h2 className="text-xs text-green-700 sm:text-sm">
            প্রতি {unitBn[elm.unit] ?? elm.unit}
          </h2>
        </div>
      </div>

      {/* bottom: price + percentage */}
      <div className="flex items-end justify-between border-t border-green-700/10 pt-3">
        <div>
          <p className="text-xs text-gray-500 sm:text-sm">আজকের দাম</p>
          <p className="text-xl font-bold text-green-800 sm:text-2xl">
            ৳{toBn(elm.today)}
          </p>
        </div>

        <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 sm:text-sm">
         📈 {toBn(Math.abs(elm.change.pct), 1)}%
        </span>
      </div>
    </div>
  );
};

export default UpPrice;