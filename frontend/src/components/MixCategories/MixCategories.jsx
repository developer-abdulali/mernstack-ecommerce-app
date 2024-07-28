import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import menPerfume from "../../assets/forMens/1.png";
import { setChecked } from "../../redux/features/shop/shopSlice";

const MixCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleCategoryClick = (category) => {
  //   dispatch(setChecked([category]));
  //   navigate("/products");
  // };

  const handleCategoryClick = (category) => {
    const categoryObj = category.filter((c) => c.name === category)[0];
    if (categoryObj) {
      dispatch(setChecked([categoryObj._id]));
      navigate("/products");
    } else {
      console.error(`Category "${category}" not found`);
    }
  };
  return (
    <>
      <div className="text-4xl text-center my-10 font-normal">Categories:</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        <div
          onClick={() => handleCategoryClick("men")}
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

        <div
          onClick={() => handleCategoryClick("women")}
          className="p-5 border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Women Category"
              className="h-full w-full object-cover rounded-lg opacity-50"
            />
            <div className="absolute top-1/2 left-0 right-0 bg-[#436C68]">
              <h3 className="text-center text-white">WOMEN</h3>
            </div>
          </div>
        </div>

        <div
          onClick={() => handleCategoryClick("men-and-women")}
          className="p-5 border border-[#436C68] h-[402px] w-full rounded-lg cursor-pointer"
        >
          <div className="relative h-full">
            <img
              src={menPerfume}
              alt="Men & Women Category"
              className="h-full w-full object-cover rounded-lg opacity-50"
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
