import React from "react";

const NavBar = () => {
  return (
    <div className="absolute top-0 flex h-16 w-full items-center justify-between bg-gray-100 px-8 shadow-md z-50">
      <div>Logo</div>
      <div className="flex items-center gap-4">
        Authentication
        <button className="rounded-md bg-amber-200 p-2 px-4 hover:cursor-pointer hover:bg-amber-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default NavBar;
