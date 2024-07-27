import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const imageUrl = `http://localhost:5000${p.image}`;

  const addToCartHandler = (product, qty) => {
    if (!userInfo) {
      toast.error("Please login first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const isInCart = cartItems.some((item) => item._id === p._id);

  return (
    <div className="w-[280px] h-[396px] border border-[#436C68] relative rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-[7px]"
            src={imageUrl}
            alt={p?.name}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-1">
        <Link to={`/product/${p._id}`}>
          <p className="mb-1 font-normal text-black truncate my-3">
            {p?.description?.substring(0, 60)} ...
          </p>
        </Link>
        <div className="flex justify-between my-2">
          <p className="mb-2 text-black">RS: {p?.price}</p>
          {p.rating && (
            <div className="flex items-center mb-1">
              <span className="mr-1 text-yellow-500">★</span>
              <span className="text-black">{p.rating}</span>
              {/* Display the number of reviews if it has one */}
              {p.numReviews > 0 && (
                <span className="ml-2 text-gray-500">
                  ({p.numReviews} reviews)
                </span>
              )}
            </div>
          )}
        </div>

        <button
          className="p-2 rounded-md bg-[#436C68] text-white w-full"
          onClick={() =>
            isInCart ? (window.location.href = "/cart") : addToCartHandler(p, 1)
          }
        >
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
