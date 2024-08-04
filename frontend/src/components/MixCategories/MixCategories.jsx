import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import menPerfume from "../../assets/forMens/1.png";
import { setChecked } from "../../redux/features/shop/shopSlice";

const MixCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCategoryId = (categoryName) => {
    const categoryMap = {
      men: "6685d313b105f2ccd29c0358",
      women: "66a0b570bc7fd6d4f71a3b9c",
      "men-and-women": "66a0b5a8bc7fd6d4f71a3ba7",
    };
    return categoryMap[categoryName] || "";
  };

  const handleCategoryClick = (category) => {
    const categoryId = getCategoryId(category);
    dispatch(setChecked([categoryId]));
    navigate("/products");
  };

  return (
    <>
      <div className="text-4xl text-center my-10 font-normal">Categories:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <div
          onClick={() => handleCategoryClick("men")}
          className="border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men Category"
              className="p-5 h-full w-full object-cover rounded-lg opacity-30"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">MEN</h3>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleCategoryClick("women")}
          className="border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Women Category"
              className="p-5 h-full w-full object-cover rounded-lg opacity-50"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">WOMEN</h3>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleCategoryClick("men-and-women")}
          className="border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men & Women Category"
              className="p-5 h-full w-full object-cover !rounded-lg opacity-50"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">MEN & WOMEN</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MixCategories;
