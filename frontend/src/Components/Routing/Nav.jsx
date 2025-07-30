import React from "react";
import { NavLink } from "react-router-dom";
import Routing from "./Routing";
import { Folder } from "lucide-react";

const Nav = () => {
  return (
    <>
      <div className="w-full h-15 text-white  bg-gradient-to-t from-gray-900 to-gray-800 flex items-center justify-between px-3">
        <div className="flex items-center gap-2.5">
          <Folder className="w-4 scale-150 h-4 mr-2 text-blue-600" />
          <h1 className="font-bold max-sm:text-sm">Backend Directory Generator</h1>
        </div>
        <div className=" flex  items-center gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) => {
              return isActive
                ? "font-semibold text-[#3c66ff] hover:underline hover:text-[#6c8cff] hover:-translate-y-0.5 transition-all ease-in-out max-sm:text-sm duration-300"
                : "font-semibold hover:underline hover:text-[#6c8cff] hover:-translate-y-0.5 transition-all ease-in-out duration-300 max-sm:text-sm";
            }}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? "font-semibold text-[#3c66ff] hover:underline hover:text-[#6c8cff] hover:-translate-y-0.5 max-sm:text-sm transition-all ease-in-out duration-300"
                : "font-semibold hover:underline hover:text-[#6c8cff] hover:-translate-y-0.5 transition-all ease-in-out max-sm:text-sm duration-300";
            }}
            to="/generate"
          >
            Get Started
          </NavLink>
        </div>
      </div>
      <Routing />
    </>
  );
};

export default Nav;
