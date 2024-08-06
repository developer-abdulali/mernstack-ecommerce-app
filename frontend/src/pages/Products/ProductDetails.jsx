// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   useGetProductDetailsQuery,
//   useCreateReviewMutation,
// } from "../../redux/api/productApiSlice";
// import Loader from "../../components/Loader/Loader";
// import Message from "../../components/Message/Message";
// import HeartIcon from "./HeartIcon";
// import Ratings from "./Ratings";
// import ProductTabs from "./ProductTabs";
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import { IoCheckmarkSharp } from "react-icons/io5";

// const ProductDetails = () => {
//   const { id: productId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const [mainImage, setMainImage] = useState("");
//   const [additionalImages, setAdditionalImages] = useState([]);

//   const {
//     data: product,
//     isLoading,
//     refetch,
//     error,
//   } = useGetProductDetailsQuery(productId);

//   console.log(product);

//   const { userInfo } = useSelector((state) => state.auth);
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const [createReview, { isLoading: loadingProductReview }] =
//     useCreateReviewMutation();

//   useEffect(() => {
//     if (cartItems.some((item) => item._id === productId)) {
//       setIsAddedToCart(true);
//     }
//   }, [cartItems, productId]);

//   useEffect(() => {
//     if (product) {
//       const mainImageUrl = `http://localhost:5000${product.image}`;
//       setMainImage(mainImageUrl);

//       // Add the main image URL to the additional images array
//       const dummyAdditionalImages = [
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150/0000FF/808080",
//         "https://via.placeholder.com/150/FF0000/FFFFFF",
//       ];
//       setAdditionalImages([mainImageUrl, ...dummyAdditionalImages]);
//     }
//   }, [product]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       await createReview({
//         productId,
//         rating,
//         comment,
//       }).unwrap();
//       refetch();
//       toast.success("Review created successfully");
//     } catch (error) {
//       toast.error(error?.data || error.message);
//     }
//   };

//   const addToCartHandler = () => {
//     dispatch(addToCart({ ...product, qty }));
//     setIsAddedToCart(true);
//   };

//   const handleButtonClick = () => {
//     if (isAddedToCart) {
//       navigate("/cart");
//     } else {
//       addToCartHandler();
//       toast.success("Item added successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleThumbnailClick = (image) => {
//     setMainImage(image);
//   };

//   // Calculate discounted price
//   const discountedPrice =
//     product?.price - (product?.price * (product?.discount || 0)) / 100;

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.message}
//         </Message>
//       ) : (
//         <div className="px-3 flex flex-col md:flex-row justify-center gap-5 mt-4 relative">
//           <div className="relative md:w-6/12 h-fit md:flex flex-col md:items-end md:justify-end">
//             <img
//               src={mainImage}
//               alt={product.name}
//               className="md:max-w-[428px] max-h-[480px] w-full h-auto rounded-lg cursor-pointer shadow-lg"
//             />
//             <HeartIcon product={product} />
//             <div className="mt-4 flex gap-2">
//               {additionalImages.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Additional ${index}`}
//                   className={`w-16 h-16 object-cover rounded-lg cursor-pointer shadow-sm ${
//                     mainImage === image ? "border-2 border-[#436C68]" : ""
//                   }`}
//                   onClick={() => handleThumbnailClick(image)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="p-2 md:w-6/12">
//             <div className="xl:w-7/12">
//               <h2 className="text-xl md:text-2xl font-semibold mb-3">
//                 {product.name}
//               </h2>
//               <Ratings
//                 value={product.rating}
//                 text={`${product.numReviews} reviews`}
//               />
//               <div className="my-5">
//                 {product?.discount ? (
//                   <div className="flex items-center">
//                     <p className="text-lg font-medium">
//                       RS: {discountedPrice.toFixed(2)}
//                     </p>
//                     <p className="ml-2 text-sm text-gray-500 line-through">
//                       RS: {product?.price}
//                     </p>
//                     <p className="ml-2 text-sm text-green-600">
//                       {product?.discount}% off
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-lg font-medium">RS: {product?.price}</p>
//                 )}
//                 {!product?.countInStock && (
//                   <div className="text-center text-sm text-red-500">
//                     Out of Stock
//                   </div>
//                 )}
//               </div>

//               <div className="my-4 text-sm text-gray-600">
//                 <div className="flex items-center">
//                   <IoCheckmarkSharp size={20} />
//                   <span className="ml-1">7 Days Money Back Guarantee</span>
//                 </div>
//                 <div className="flex items-center">
//                   <IoCheckmarkSharp size={20} />
//                   <span className="ml-1"> Cash on Delivery Available</span>
//                 </div>
//                 <div className="flex items-center">
//                   <IoCheckmarkSharp size={20} />
//                   <span className="ml-1"> All cards accepted</span>
//                 </div>
//               </div>
//               <hr className="my-4" />
//               <p className="text-[18px] mb-2">Product Details</p>
//               <p className="mb-2">Brand: {product.brand}</p>
//               <p className="mb-2">
//                 Availability :{" "}
//                 {product.countInStock ? "In Stock" : "Out of Stock"}
//               </p>
//               <p className="mb-2">Delivery : 5 to 7 Days</p>

//               <button
//                 onClick={handleButtonClick}
//                 disabled={product.countInStock === 0}
//                 className="w-full md:w-auto bg-[#436C68] hover:bg-[#436c68e6] text-white py-2 px-4 rounded-lg disabled:opacity-50"
//               >
//                 {isAddedToCart ? "Go To Cart" : "Add To Cart"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex flex-wrap items-center justify-center">
//         <ProductTabs
//           loadingProductReview={loadingProductReview}
//           userInfo={userInfo}
//           submitHandler={submitHandler}
//           rating={rating}
//           setRating={setRating}
//           comment={comment}
//           setComment={setComment}
//           product={product}
//         />
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { IoCheckmarkSharp } from "react-icons/io5";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log(product);

  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  useEffect(() => {
    if (cartItems.some((item) => item._id === productId)) {
      setIsAddedToCart(true);
    }
  }, [cartItems, productId]);

  useEffect(() => {
    if (product) {
      const baseURL = "http://localhost:5000/";
      const mainImageUrl = `${baseURL}${product.image}`;
      setMainImage(mainImageUrl);

      // Add the base URL to each additional image
      const formattedAdditionalImages = product.additionalImages?.map(
        (imgPath) => `${baseURL}${imgPath}`
      );
      setAdditionalImages([mainImageUrl, ...formattedAdditionalImages]);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    setIsAddedToCart(true);
  };

  const handleButtonClick = () => {
    if (isAddedToCart) {
      navigate("/cart");
    } else {
      addToCartHandler();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  // Calculate discounted price
  const discountedPrice =
    product?.price - (product?.price * (product?.discount || 0)) / 100;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="px-3 flex flex-col md:flex-row justify-center gap-5 mt-4 relative">
          <div className="relative md:w-6/12 h-fit md:flex flex-col md:items-end md:justify-end">
            <img
              src={mainImage}
              alt={product.name}
              className="md:max-w-[428px] h-[480px] w-full rounded-lg cursor-pointer shadow-lg"
              // className="md:max-w-[428px] max-h-[480px] w-full h-auto rounded-lg cursor-pointer shadow-lg"
            />
            <HeartIcon product={product} />
            <div className="mt-4 flex gap-2">
              {additionalImages?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Additional ${index}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer shadow-sm ${
                    mainImage === image ? "border-2 border-[#436C68]" : ""
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="p-2 md:w-6/12">
            <div className="xl:w-7/12">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                {product.name}
              </h2>
              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <div className="my-5">
                {product?.discount ? (
                  <div className="flex items-center">
                    <p className="text-lg font-medium">
                      RS: {discountedPrice.toFixed(2)}
                    </p>
                    <p className="ml-2 text-sm text-gray-500 line-through">
                      RS: {product?.price}
                    </p>
                    <p className="ml-2 text-sm text-green-600">
                      {product?.discount}% off
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-medium">RS: {product?.price}</p>
                )}
                {!product?.countInStock && (
                  <div className="text-center text-sm text-red-500">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="my-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <IoCheckmarkSharp size={20} />
                  <span className="ml-1">7 Days Money Back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <IoCheckmarkSharp size={20} />
                  <span className="ml-1"> Cash on Delivery Available</span>
                </div>
                <div className="flex items-center">
                  <IoCheckmarkSharp size={20} />
                  <span className="ml-1"> All cards accepted</span>
                </div>
              </div>
              <hr className="my-4" />
              <p className="text-[18px] mb-2">Product Details</p>
              <p className="mb-2">Brand: {product.brand}</p>
              <p className="mb-2">
                Availability :{" "}
                {product.countInStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="mb-2">Delivery : 5 to 7 Days</p>

              <button
                onClick={handleButtonClick}
                disabled={product.countInStock === 0}
                className="w-full md:w-auto bg-[#436C68] hover:bg-[#436c68e6] text-white py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {isAddedToCart ? "Go To Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetails;
