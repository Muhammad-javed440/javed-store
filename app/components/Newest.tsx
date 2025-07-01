import { client } from "@/sanity/lib/client";
import { Product } from "../interface";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'product'][0...5] | order(_createdAt desc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: Product[] = await getData();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:px-0">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-500">
            Our Newest Products
          </h2>
          <Link href="/all" className="text-primary flex items-center gap-2 text-sm sm:text-base">
            See All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product._id} className="group">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex justify-between items-start text-sm sm:text-base">
                <div>
                  <h3 className="text-yellow-500 font-medium">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-gray-500">{product.categoryName}</p>
                </div>
                <p className="font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
