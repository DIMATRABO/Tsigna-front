import Home from "components/home/home";
import Main from "components/main/main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Navbar from "components/navbar/navbar";

const Gateway = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/workspace">
          <Route
            path="newBot"
            element={
              <>
                <Navbar />
                <Main />
              </>
            }
          />
          <Route
            path="bot/:botId"
            element={
              <>
                <Navbar />
                <Main />
              </>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Gateway;
