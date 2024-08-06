// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import HeartIcon from "./HeartIcon";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import { toast } from "react-toastify";

// const Product = ({ product }) => {
//   console.log("favorites", product);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   // Calculate discounted price
//   const discountedPrice =
//     product.price - (product.price * (product.discount || 0)) / 100;
//   const imageUrl = `http://localhost:5000${product.image}`;

//   const addToCartHandler = (product, qty) => {
//     if (!userInfo) {
//       toast.error("Please login first", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       return;
//     }
//     dispatch(addToCart({ ...product, qty }));
//     toast.success("Item added successfully", {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 2000,
//     });
//   };

//   const isInCart = cartItems.some((item) => item._id === product._id);

//   return (
//     <div className="border border-[#436C68] relative rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//       <section className="relative">
//         <Link to={`/product/${product._id}`}>
//           <img
//             className="cursor-pointer w-full rounded-t-[7px]"
//             src={imageUrl}
//             alt={product?.name}
//           />
//         </Link>
//         <HeartIcon product={product} />
//       </section>

//       <div className="p-1">
//         <Link to={`/product/${product._id}`}>
//           <p className="mb-1 font-normal text-black truncate my-3">
//             {product.name}
//           </p>
//         </Link>
//         <div className="flex justify-between my-2">
//           {product.discount ? (
//             <div className="flex items-center">
//               <p className="text-lg font-medium">
//                 RS: {discountedPrice.toFixed(2)}
//               </p>
//               <p className="ml-2 text-sm text-gray-500 line-through">
//                 RS: {product.price}
//               </p>
//               <p className="ml-2 text-sm text-green-600">
//                 {product.discount}% off
//               </p>
//             </div>
//           ) : (
//             <p className="mb-2 text-black">RS: {product.price}</p>
//           )}
//           {!product.countInStock ? (
//             <div className="text-center text-sm ml-2 text-red-500">
//               Out of Stock
//             </div>
//           ) : null}
//         </div>

//         <button
//           onClick={() =>
//             isInCart ? navigate("/cart") : addToCartHandler(product, 1)
//           }
//           className="p-2 rounded-md bg-[#436C68] text-white w-full"
//         >
//           {isInCart ? "Go To Cart" : "Add To Cart"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  console.log("favorites", product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // Base URL for image paths
  const baseURL = "http://localhost:5000/";

  // Format the image URL
  const imageUrl = `${baseURL}${product.image}`;

  // Calculate discounted price
  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

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

  const isInCart = cartItems.some((item) => item._id === product._id);

  return (
    <div className="border border-[#436C68] relative rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            className="cursor-pointer w-full rounded-t-[7px]"
            src={imageUrl}
            alt={product?.name}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="p-1">
        <Link to={`/product/${product._id}`}>
          <p className="mb-1 font-normal text-black truncate my-3">
            {product.name}
          </p>
        </Link>
        <div className="flex justify-between my-2">
          {product.discount ? (
            <div className="flex items-center">
              <p className="text-lg font-medium">
                RS: {discountedPrice.toFixed(2)}
              </p>
              <p className="ml-2 text-sm text-gray-500 line-through">
                RS: {product.price}
              </p>
              <p className="ml-2 text-sm text-green-600">
                {product.discount}% off
              </p>
            </div>
          ) : (
            <p className="mb-2 text-black">RS: {product.price}</p>
          )}
          {!product.countInStock ? (
            <div className="text-center text-sm ml-2 text-red-500">
              Out of Stock
            </div>
          ) : null}
        </div>

        <button
          onClick={() =>
            isInCart ? navigate("/cart") : addToCartHandler(product, 1)
          }
          className="p-2 rounded-md bg-[#436C68] text-white w-full"
        >
          {isInCart ? "Go To Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
