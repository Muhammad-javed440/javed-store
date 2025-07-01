"use client";

import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroImageType {
  image1: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export default function Hero() {
  const [data, setData] = useState<HeroImageType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const query = "*[_type == 'heroImage'][0]";
      const res = await client.fetch(query);
      setData(res);
    }

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:text-6xl">
            Top Fashion for Top Price!
          </h1>
          <p className="max-w-md mx-auto lg:mx-0 leading-relaxed text-yellow-600 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best, so come and shop with us.
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image1).url()}
              width={700}
              height={700}
              alt="fashion banner"
              className="h-auto w-full object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="flex w-full sm:w-auto divide-x overflow-hidden rounded-lg border">
          {["Men", "Women", "Teen"].map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="flex-1 text-center px-4 py-3 text-yellow-300 text-xl sm:text-2xl font-medium transition duration-200 hover:bg-red-600 active:bg-gray-200"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
