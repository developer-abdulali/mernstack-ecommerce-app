import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [searchInput, setSearchInput] = useState("");

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

  // Calculate discounted price
  const discountedPrice = p.price - (p.price * (p.discount || 0)) / 100;

  // Highlight the matching text in the product name
  const highlightedName = searchInput
    ? p?.name?.split(new RegExp(`(${searchInput})`, "gi"))?.map((part, i) =>
        part.toLowerCase() === searchInput.toLowerCase() ? (
          <span key={i} className="text-red-500">
            {part}
          </span>
        ) : (
          part
        )
      )
    : p?.name;

  // Update search input state as the user types
  useEffect(() => {
    const handleInputChange = (event) => {
      setSearchInput(event.target.value);
    };

    // Attach event listener to input change
    window.addEventListener("input", handleInputChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("input", handleInputChange);
    };
  }, []);

  return (
    <div className="w-[300px] md:w-[280px] h-fit border border-[#436C68] relative rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
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
            {highlightedName}...
          </p>
        </Link>
        <div className="flex justify-between my-2">
          {p.discount ? (
            <div className="flex items-center">
              <p className="text-lg font-medium">
                RS: {discountedPrice.toFixed(2)}
              </p>
              <p className="ml-2 text-sm text-gray-500 line-through">
                RS: {p.price}
              </p>
              <p className="ml-2 text-sm text-green-600">{p.discount}% off</p>
            </div>
          ) : (
            <p className="mb-2 text-black">RS: {p.price}</p>
          )}
          {!p.countInStock ? (
            <div className="text-center text-sm ml-2 text-red-500">
              Out of Stock
            </div>
          ) : null}
        </div>

        <button
          className={`p-2 rounded-md ${
            p.countInStock > 0
              ? "bg-[#436C68] hover:bg-[#436C68] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } w-full`}
          onClick={() =>
            p.countInStock > 0 &&
            (isInCart
              ? (window.location.href = "/cart")
              : addToCartHandler(p, 1))
          }
          disabled={p.countInStock === 0}
        >
          {p.countInStock > 0
            ? isInCart
              ? "Go to Cart"
              : "Add to Cart"
            : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
