'use client';

import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/client";
import { useShoppingCart } from "use-shopping-cart";

interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: SanityImage;
  price_id: string;
}

export default function AddToBag({
  currency,
  name,
  description,
  price,
  image,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
      className="
        w-full sm:w-auto
        px-4 py-2
        text-sm sm:text-base
        font-semibold
        bg-blue-600 text-white
        hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        rounded-lg
        transition duration-200 ease-in-out
      "
    >
      Add To Cart
    </Button>
  );
}
