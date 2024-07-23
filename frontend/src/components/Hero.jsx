import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/heroImgs/1.png";

const Hero = () => {
  return (
    <div className="w-full">
      <Link to="/products">
        <img
          src={HeroImg}
          alt="Hero Banner"
          className="w-full h-auto lg:h-[52rem] object-cover object-center"
        />
      </Link>
    </div>
  );
};

export default Hero;
