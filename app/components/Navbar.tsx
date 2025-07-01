"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ← Import Image
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teen", href: "/Teen" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="mb-8 border-b bg-red-700">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-3 sm:px-6 lg:max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg" // ← Your logo file path (must be in /public)
            alt="Javed Store Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain rounded-full shadow-md" // Adjust size and styles as needed
          />
          <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
            Javed <span className="text-yellow-300">Store</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 xl:gap-10">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-lg xl:text-xl font-medium transition-colors ${
                pathname === link.href
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart Button */}
        <div className="mt-4 sm:mt-0">
          <Button
            variant={"outline"}
            onClick={handleCartClick}
            className="flex items-center gap-x-1 h-10 sm:h-12 px-3 sm:px-6 bg-white text-black hover:bg-yellow-400"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-semibold">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
