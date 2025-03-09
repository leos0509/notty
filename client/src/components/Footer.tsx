"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="w-full bg-gray-900 px-8 py-16 text-center text-white flex flex-col items-center justify-center gap-4">
      <button
        className="relative cursor-pointer font-mono text-2xl font-bold uppercase hover:opacity-80"
        onClick={() => router.push("/")}
      >
        NOTTY
      </button>
      <p>© {new Date().getFullYear()} made by {process.env.NEXT_PUBLIC_OWNER_NAME}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
