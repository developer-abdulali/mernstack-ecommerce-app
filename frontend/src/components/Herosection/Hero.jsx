import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImg from "../../assets/heroImgs/1.png";
import { FaCheckCircle, FaRegCreditCard, FaTruck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import MixCategories from "../MixCategories/MixCategories";

const Hero = () => {
  return (
    <div className="w-full overflow-hidden">
      <Link to="/products">
        <img
          src={HeroImg}
          alt="Hero Banner"
          className="w-full h-auto lg:h-[52rem] object-cover object-center"
        />
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center my-20 mx-4">
        <div className="flex flex-col items-center">
          <div className="text-4xl text-green-600">
            <FaCheckCircle />
          </div>
          <div className="text-xl md:text-2xl font-medium">Money Guarantee</div>
          <div className="text-xl md:text-2xl font-normal">
            7 Days Money Back
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl text-green-600">
            <FaTruck />
            {/* <i className="fa-solid fa-truck-fast"></i> */}
          </div>
          <div className="text-xl md:text-2xl font-medium">Fast Delivery</div>
          <div className="text-xl md:text-2xl">Within 3-5 business days</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl text-green-600">
            <FaRegCreditCard />
          </div>
          <div className="text-xl md:text-2xl font-medium">Secure Payments</div>
          <div className="text-xl md:text-2xl">All Cards Accepted</div>
        </div>
      </div>

      <MixCategories />
    </div>
  );
};

export default Hero;
