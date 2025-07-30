import React from "react";
import { NavLink } from "react-router-dom";
import Routing from "./Routing";

const Nav = () => {
  return (
    <>
      <div className="w-full h-20 border flex justify-end gap-3">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/generate">Get Started</NavLink>
        <Routing />
      </div>
    </>
  );
};

export default Nav;
