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
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto lg:flex-col lg:w-24">
        {images.map((image) => (
          <div
            key={image._id}
            onClick={() => handleSmallImageClick(image)}
            className="min-w-[72px] h-20 lg:h-24 overflow-hidden rounded-md bg-gray-100 cursor-pointer border hover:border-black transition"
          >
            <Image
              src={urlFor(image).url()}
              width={100}
              height={100}
              alt={image.alt || "Thumbnail"}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Large Image */}
      <div className="relative flex-1 overflow-hidden rounded-lg bg-gray-100 w-full max-h-[500px]">
        <Image
          src={urlFor(bigImage).url()}
          alt={bigImage.alt || "Main photo"}
          width={800}
          height={800}
          className="w-full h-full object-cover object-center"
        />

        <span className="absolute top-0 left-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
