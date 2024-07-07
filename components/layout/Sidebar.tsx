"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/menu";
import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-rose-200 max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex flex-col gap-12">
        {navLinks.map((nav) => (
          <Link
            href={nav.url}
            key={nav.label}
            className={`font-semibold flex gap-4 items-center hover:text-rose-400 transition ${
              pathname === nav.url && "text-rose-400"
            }`}
          >
            <span className="text-lg">{nav.icon}</span>
            <p>{nav.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 font-semibold items-center">
        <UserButton />
        <p>마이페이지</p>
      </div>
    </div>
  );
}
