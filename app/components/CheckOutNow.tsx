"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/sanity/lib/client";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  return (
    <div className="w-full flex justify-center md:justify-start">
      <Button
        variant="outline"
        onClick={() => buyNow(product.price_id)}
        className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base md:text-lg rounded-xl transition-all duration-200"
      >
        Checkout Now
      </Button>
    </div>
  );
}
