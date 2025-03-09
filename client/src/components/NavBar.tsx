"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-b-gray-200 bg-white px-8 py-8">
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer font-mono text-2xl font-bold uppercase hover:opacity-80 relative"
          onClick={() => router.push("/")}
        >
          NOTTY
        </button>
        <div className="flex items-center">
          <button
            className="px-4 py-2 text-sm text-gray-500 capitalize hover:cursor-pointer hover:text-gray-800"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="px-4 py-2 text-sm text-gray-500 capitalize hover:cursor-pointer hover:text-gray-800"
            onClick={() =>
              router.push(process.env.NEXT_PUBLIC_OWNER_BLOG_URL || "/")
            }
          >
            My Blogs
          </button>
          <button
            className="px-4 py-2 text-sm text-gray-500 capitalize hover:cursor-pointer hover:text-gray-800"
            onClick={() =>
              router.push(process.env.NEXT_PUBLIC_OWNER_PORTFOLIO_URL || "/")
            }
          >
            My Portfolio
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="rounded-md hover:opacity-80 text-sm capitalize hover:cursor-pointer" onClick={() => window.location.href = process.env.NEXT_PUBLIC_OWNER_GITHUB_URL || ""}>
          <Image src="/github.svg" alt="github-icon" width={24} height={24}/>
        </button>
        <button className="rounded-md hover:opacity-80 text-sm capitalize hover:cursor-pointer" onClick={() => window.location.href = process.env.NEXT_PUBLIC_OWNER_LINKEDIN_URL || ""}>
          <Image src="/linkedin.svg" alt="linkedin-icon" width={24} height={24}/>
        </button>
        <button className="rounded-md hover:opacity-80 text-sm capitalize hover:cursor-pointer" onClick={() => window.location.href = `mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL || ""}`}>
          <Image src="/gmail.svg" alt="gmail-icon" width={24} height={24}/>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
