import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImg from "../assets/heroImgs/1.png";
import { FaCheckCircle, FaRegCreditCard, FaTruck } from "react-icons/fa";
import menPerfume from "../assets/forMens/1.png";
import { useDispatch } from "react-redux";
import { setChecked } from "../redux/features/shop/shopSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    dispatch(setChecked([category]));
    navigate("/products");
  };

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
          <div className="text-xl md:text-2xl font-extrabold">
            Money Guarantee
          </div>
          <div className="text-xl md:text-2xl font-normal">
            7 Days Money Back
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl text-green-600">
            <FaTruck />
            {/* <i className="fa-solid fa-truck-fast"></i> */}
          </div>
          <div className="text-xl md:text-2xl font-extrabold">
            Fast Delivery
          </div>
          <div className="text-xl md:text-2xl">Within 3-5 business days</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl text-green-600">
            {/* <i className="fa fa-credit-card"></i> */}
            <FaRegCreditCard />
          </div>
          <div className="text-xl md:text-2xl font-extrabold">
            Secure Payments
          </div>
          <div className="text-xl md:text-2xl">All Cards Accepted</div>
        </div>
      </div>

      {/* mix categories */}
      <div className="text-4xl text-center my-10 font-normal">Categories:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {/* Men Category */}
        <div
          onClick={() => handleCategoryClick("Men")}
          className="p-5 border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men Category"
              className="h-full w-full object-cover rounded-lg opacity-30"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">MEN</h3>
            </div>
          </div>
        </div>

        {/* Women Category */}
        <div
          onClick={() => handleCategoryClick("Women")}
          className="p-5 border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men Category"
              className="h-full w-full object-cover rounded-lg opacity-50"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">WOMEN</h3>
            </div>
          </div>
        </div>

        {/* Men & Women Category */}
        <div
          onClick={() => handleCategoryClick("Men & Women")}
          className="p-5 border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men Category"
              className="h-full w-full object-cover rounded-lg opacity-50"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">MEN & WOMEN</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
