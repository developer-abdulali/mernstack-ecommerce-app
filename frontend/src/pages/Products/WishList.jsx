import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const WishList = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container mx-auto px-4 mt-8">
      {favorites.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold text-center">
            My Wishlist (0)
          </h2>
          <p className="text-center my-1">Oops! Your wishlist is empty :</p>
          <Link
            to="/products"
            className="text-center text-blue-600 hover:underline"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
