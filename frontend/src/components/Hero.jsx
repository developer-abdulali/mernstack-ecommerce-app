import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/hero-img.jpg";

const Hero = () => {
  return (
    <div className="relative">
      <div className="hero-img">
        <img src={HeroImg} alt="Image" className="w-full object-cover" />
      </div>

      <div className="absolute top-20 leading-tight">
        <div>
          Everything's better with a bit of fragrance
          <p className="text-xl my-4 text-[#000000]">
            Choose from our wide variety of fragrances
          </p>
          <Link
            to="/products"
            className="bg-[#436C68] hover:bg-[#436c68d5] duration-300 text-2xl text-white py-2 px-4 font-normal"
          >
            <button className="btn btn-primary">Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
