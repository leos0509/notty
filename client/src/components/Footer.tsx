"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4 bg-gray-900 px-8 py-16 text-center text-white">
      <button
        className="relative cursor-pointer font-mono text-2xl font-bold uppercase hover:opacity-80"
        onClick={() => router.push("/")}
      >
        NOTTY
      </button>
      <p>
        © {new Date().getFullYear()} made by{" "}
        {process.env.NEXT_PUBLIC_OWNER_NAME}. All rights reserved.
      </p>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-sm italic">Check out my links:</h1>
        <div className="bg-background flex items-center gap-4 rounded-full p-2">
          <button
            className="rounded-md text-sm capitalize hover:cursor-pointer hover:opacity-80"
            onClick={() =>
              (window.location.href =
                process.env.NEXT_PUBLIC_OWNER_GITHUB_URL || "")
            }
          >
            <Image src="/github.svg" alt="github-icon" width={24} height={24} />
          </button>
          <button
            className="rounded-md text-sm capitalize hover:cursor-pointer hover:opacity-80"
            onClick={() =>
              (window.location.href =
                process.env.NEXT_PUBLIC_OWNER_LINKEDIN_URL || "")
            }
          >
            <Image
              src="/linkedin.svg"
              alt="linkedin-icon"
              width={24}
              height={24}
            />
          </button>
          <button
            className="rounded-md text-sm capitalize hover:cursor-pointer hover:opacity-80"
            onClick={() =>
              (window.location.href = `mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL || ""}`)
            }
          >
            <Image src="/gmail.svg" alt="gmail-icon" width={24} height={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
