import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const HorizontalCard = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const addToCartHandler = (product, qty) => {
    if (!userInfo) {
      toast.error("Please login first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      navigate("/cart");
    } else {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 overflow-hidden">
      {data.products.slice(0, 4).map((product) => {
        const existingItem = cartItems.find((item) => item._id === product._id);

        return (
          <div
            key={product._id}
            className="flex flex-col md:flex-row items-center p-2 border border-[#436C68] rounded-md mb-4 w-full"
          >
            <img
              src={`http://localhost:5000${product?.image}`}
              className="w-full md:w-40 h-40 object-cover"
              alt={product.name}
            />

            <div className="flex-1 pl-0 md:pl-4">
              <Link to={`/product/${product._id}`}>
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
                  {product.brand}
                </div>

                <p className="text-lg font-medium mb-2">{product.name}</p>

                <div className="text-xl font-bold mb-4">
                  RS: {product.price}
                </div>
              </Link>

              <button
                onClick={() => addToCartHandler(product, 1)}
                className="w-full px-4 py-2 text-white bg-[#436C68] rounded-md hover:bg-[#436c68e8] disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {existingItem ? "Go To Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HorizontalCard;
