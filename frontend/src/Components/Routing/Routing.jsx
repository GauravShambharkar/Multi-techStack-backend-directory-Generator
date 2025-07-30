import React from "react";
import Home from "../Home";
import { Route, Routes } from "react-router";
import Form from "../Form";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}>
          Home
        </Route>
        <Route path="/generate" element={<Form />}>
          Get started
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
