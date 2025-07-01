"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { CartItem } from "../types";
import React from "react";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout("sdfghjfrty");
      if (result?.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="w-[90vw] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-lg sm:text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-6 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="text-lg sm:text-2xl py-6 text-center">
                  You do not have any items
                </h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry: CartItem) => (
                    <li
                      key={entry.id}
                      className="flex flex-col sm:flex-row py-6 gap-4"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {entry.image ? (
                          <Image
                            src={entry.image}
                            alt="Product image"
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start text-base font-medium text-gray-900">
                          <h3 className="text-sm sm:text-base">{entry.name}</h3>
                          <p className="ml-4 text-sm sm:text-base">${entry.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {entry.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm mt-4">
                          <p className="text-gray-700 mb-2 sm:mb-0">
                            Quantity: {entry.quantity}
                          </p>
                          <Button
                            type="button"
                            onClick={() => removeItem(entry.id)}
                            className="text-red-600 hover:text-red-800 px-0"
                            variant="link"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout
            </p>
            <div className="mt-6">
              <Button className="w-full text-sm sm:text-base" onClick={handleCheckoutClick}>
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-sm text-gray-500">
              <Button
                onClick={() => handleCartClick()}
                className="text-black hover:underline px-0"
                variant="link"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
