import React from "react";
import PageNotFoundSVG from "../assets/404.svg";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <img
        src={PageNotFoundSVG}
        alt="page not found"
        className="w-full h-full  "
      />
    </div>
  );
};

export default PageNotFound;
