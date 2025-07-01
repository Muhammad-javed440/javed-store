import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
      {/* Content Wrapper */}
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:text-6xl">
            Top Fashion for Top Price!
          </h1>
          <p className="max-w-md mx-auto lg:mx-0 text-yellow-600 leading-relaxed sm:text-lg md:text-xl">
            We sell only the most exclusive and high quality products for you. We are the best, so come and shop with us.
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            <Image
              src={urlFor(data.image1).url()}
              width={800} // Increased width
              height={800} // Increased height
              alt="Hero Image"
              className="w-full h-auto object-cover object-center"
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
