"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/menu";
import { UserButton } from "@clerk/nextjs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 w-full flex justify-between items-center px-8 py-4 bg-rose-200 lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((nav) => (
          <Link
            href={nav.url}
            key={nav.label}
            className={`font-semibold hover:text-rose-400 transition ${
              pathname === nav.url && "text-rose-400"
            }`}
          >
            <p>{nav.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center">
        <HiOutlineMenuAlt1
          className="cursor-pointer md:hidden text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        />
        {mobileMenu && (
          <div className="absolute top-12 right-6 flex flex-col gap-8 p-6 bg-white shadow-md rounded-md md:hidden">
            {navLinks.map((nav) => (
              <Link
                href={nav.url}
                key={nav.label}
                className={`flex items-center gap-4 font-semibold hover:text-rose-400 transition ${
                  pathname === nav.url && "text-rose-400"
                }`}
              >
                <span>{nav.icon}</span>
                <p className="text-sm whitespace-nowrap">{nav.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}
