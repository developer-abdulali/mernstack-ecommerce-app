import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCartItems,
  removeFromCart,
} from "../redux/features/cart/cartSlice";
import {
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
  addFavoriteToLocalStorage,
} from "../Utils/localStorage";
import {
  removeFromFavorites,
  setFavorites,
  addToFavorites,
} from "../redux/features/favorites/favoriteSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate the total number of products in the cart
  const totalProductsInCart = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const favorites = useSelector((state) => state.favorites) || [];

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = (product) => {
    const isFavorite = favorites.some((p) => p._id === product._id);

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
      dispatch(clearCartItems());
      toast.success("Item moved successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="max-w-6xl container mx-auto mt-8 px-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center h-screen">
          <h2 className="text-2xl font-normal text-center">
            My Cart ({totalProductsInCart})
          </h2>
          <p className="text-center my-1">Oops! Your cart is empty :</p>
          <Link to="/products" className="text-center text-blue-600">
            Go To Shop
          </Link>
        </div>
      ) : (
        // cart card
        <>
          <h2 className="text-2xl font-normal text-center">
            My Cart ({totalProductsInCart})
          </h2>
          <div className="flex flex-col lg:flex-row justify-around items-start">
            <div className="w-full lg:w-2/3 p-4 bg-[#E9E9E9] rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center mb-4 p-4 border border-[#436C68] rounded-lg shadow-sm bg-white"
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="object-cover h-48 w-full sm:w-48"
                  />

                  <div className="ml-4 flex-1 w-full sm:w-auto">
                    <Link to={`/product/${item._id}`} className="text-gray-700">
                      {item.name}
                    </Link>
                    <div className="my-3 text-gray-700">RS: {item.price}</div>
                    <div className="flex items-center my-2">
                      <button
                        className="border border-[#436C68] rounded-full px-2 mx-1"
                        onClick={() => addToCartHandler(item, item.qty - 1)}
                        disabled={item.qty === 1}
                      >
                        -
                      </button>
                      <span className="px-4 text-center border border-[#436C68] rounded">
                        {item.qty}
                      </span>
                      <button
                        className="border border-[#436C68] rounded-full px-2 mx-1"
                        onClick={() => addToCartHandler(item, item.qty + 1)}
                        disabled={item.qty === item.countInStock}
                      >
                        +
                      </button>
                    </div>

                    <div className="my-2">
                      <button
                        className="border w-full py-1 bg-[#436C68] hover:bg-[#436c68e6] text-white rounded"
                        onClick={() => toggleFavorites(item)}
                      >
                        Move to Favorites
                      </button>
                    </div>

                    <div className="my-2">
                      <button
                        className="text-gray-700 border py-1 border-[#436C68] rounded w-full"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout section */}
            <div className="w-full lg:w-1/3 p-4 bg-[#E9E9E9] mt-4 lg:mt-0 ml-0 lg:ml-5 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-black">
                Price Details
              </h2>
              <div className="text-black">
                <div className="flex justify-between mb-2">
                  <span>
                    Price ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    items)
                  </span>
                  <span>
                    RS:{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount</span>
                  <span>- RS: 0</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Charges</span>
                  <span>RS: 50</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2 font-bold">
                  <span>Total Amount</span>
                  <span>
                    RS:{" "}
                    {(
                      cartItems.reduce(
                        (acc, item) => acc + item.qty * item.price,
                        0
                      ) + 50
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="text-green-500">
                  You will save RS: 0 on this order
                </div>
                <button
                  className="bg-[#436C68] hover:bg-[#436c68e6] text-white mt-4 py-2 px-4 rounded text-lg w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
