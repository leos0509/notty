"use client";
import useUserStore from "@/store/userStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { user, signout } = useUserStore();

  const handleSignout = async () => {
    router.push("/signin");
    signout();
    setIsOpenUser(false);
  };

  return (
    <div className="absolute top-0 z-50 flex h-16 w-full items-center justify-between border-b border-b-gray-200 bg-white px-8 py-8">
      <div className="flex items-center gap-4">
        <button
          className="relative cursor-pointer font-mono text-2xl font-bold uppercase hover:opacity-80"
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
      <div className="relative flex items-center gap-6">
        {user && (
          <>
            <div
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-full p-2 px-4 hover:bg-gray-200 ${isOpenUser ? "bg-gray-300" : "bg-gray-100"}`}
              onClick={() => setIsOpenUser(!isOpenUser)}
            >
              <User size={24} />
              <p>{user?.name}</p>
            </div>
            <div
              className={`absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-md bg-gray-100 p-2 shadow ${isOpenUser ? "block" : "hidden"}`}
            >
              <button
                className="px-4 text-nowrap hover:font-semibold hover:underline hover:cursor-pointer"
                onClick={handleSignout}
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
