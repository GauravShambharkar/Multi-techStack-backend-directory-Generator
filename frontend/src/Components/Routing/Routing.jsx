import React from "react";
import Home from "../Home";
import { Route, Routes } from "react-router";
import Form from "../Form";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          Home
        </Route>
        <Route path="/generate" element={<Form />}>
          GenerateDirectory
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
