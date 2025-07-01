"use client";

import Image from "next/image";
import { urlFor } from "../../sanity/lib/client";
import { useState } from "react";

interface ImageType {
  _id: string;
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface ImageGalleryProps {
  images: ImageType[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState<ImageType>(images[0]);

  const handleSmallImageClick = (image: ImageType) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Thumbnail Images */}
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image) => (
          <div
            key={image._id}
            onClick={() => handleSmallImageClick(image)}
            className="overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
          >
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt={image.alt || "photo"}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Large Image Display */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt={bigImage.alt || "big photo"}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
