import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-green-700 text-red-100">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-4 text-center text-sm sm:px-6 md:flex-row md:justify-between md:gap-4 md:text-left md:text-base lg:px-8">
        {/* left section */}
        <p>
          <span className="font-bold text-white">বাজার দর</span>
          <span className="mx-2">।</span>
          সকল পণ্যের দাম এক নজরে
        </p>

        {/* right section */}
        <p className="text-red-200">
          সকল দাম সম্ভাব্য, বাজার অবস্থার উপর নির্ভর করে।
        </p>
      </div>
    </footer>
  );
};

export default Footer;