// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../../components/Message";
// import ProgressSteps from "../../components/ProgressSteps";
// import Loader from "../../components/Loader";
// import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
// import { clearCartItems } from "../../redux/features/cart/cartSlice";

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);

//   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

//   useEffect(() => {
//     if (!cart.shippingAddress.address) {
//       navigate("/shipping");
//     }
//   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

//   const placeOrderHandler = async () => {
//     try {
//       const res = await createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: cart.itemsPrice,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       }).unwrap();
//       dispatch(clearCartItems());
//       navigate(`/order/${res._id}`);
//       toast.success("Item ordered successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   return (
//     <>
//       <ProgressSteps step1 step2 step3 />

//       <div className="container mx-auto mt-8">
//         {cart.cartItems.length === 0 ? (
//           <Message>Your cart is empty</Message>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr>
//                   <td className="px-1 py-2 text-left align-top">Image</td>
//                   <td className="px-1 py-2 text-left">Product</td>
//                   <td className="px-1 py-2 text-left">Quantity</td>
//                   <td className="px-1 py-2 text-left">Price</td>
//                   <td className="px-1 py-2 text-left">Total</td>
//                 </tr>
//               </thead>

//               <tbody>
//                 {cart.cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td className="p-2">
//                       <img
//                         src={`http://localhost:5000${item.image}`}
//                         // src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover"
//                       />
//                     </td>

//                     <td className="p-2">
//                       <Link to={`/product/${item.product}`}>{item.name}</Link>
//                     </td>
//                     <td className="p-2">{item.qty}</td>
//                     <td className="p-2">{item.price.toFixed(2)}</td>
//                     <td className="p-2">
//                       RS: {(item.qty * item.price).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
//           <div className="flex justify-between flex-wrap p-8 bg-[#eae6e6]">
//             <ul className="text-lg">
//               <li>
//                 <span className="font-semibold mb-4">Items:</span> RS:
//                 {cart.itemsPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4">Shipping:</span> RS:
//                 {cart.shippingPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4">Tax:</span> RS:
//                 {cart.taxPrice}
//               </li>
//               <li>
//                 <span className="font-semibold mb-4">Total:</span> RS:
//                 {cart.totalPrice}
//               </li>
//             </ul>

//             {error && <Message variant="danger">{error.data.message}</Message>}

//             <div>
//               <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
//               <p>
//                 <strong>Address:</strong> {cart?.shippingAddress?.address},{" "}
//                 {cart.shippingAddress?.city} {cart?.shippingAddress?.postalCode}
//                 , {cart?.shippingAddress?.country}
//               </p>
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
//               <strong>Method:</strong> {cart?.paymentMethod}
//             </div>
//           </div>

//           <button
//             type="button"
//             className="bg-[#436C68] hover:bg-[#436c68e6] text-white py-2 px-4 rounded text-lg w-full mt-4"
//             disabled={cart.cartItems === 0}
//             onClick={placeOrderHandler}
//           >
//             Place Order
//           </button>

//           {isLoading && <Loader />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlaceOrder;

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";
import Loader from "../../components/Loader/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import {
  setPrice,
  setDiscount,
  calculateDiscountedPrice,
} from "../../redux/features/shop/shopSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const shop = useSelector((state) => state.shop);
  const { discountedPrice } = shop;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }

    if (cart.cartItems.length > 0) {
      const totalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      const totalDiscount = cart.cartItems.reduce(
        (acc, item) => acc + item.discount,
        0
      );

      dispatch(setPrice(totalPrice));
      dispatch(setDiscount(totalDiscount));
      dispatch(calculateDiscountedPrice());
    }
  }, [cart.cartItems, cart.shippingAddress.address, navigate, dispatch]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: discountedPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: discountedPrice + cart.shippingPrice + cart.taxPrice, // Calculate total price including shipping and tax
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
      toast.success("Order placed successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  // Ensure values are numbers before using toFixed
  const itemsPrice = Number(discountedPrice);
  const shippingPrice = Number(cart.shippingPrice);
  const taxPrice = Number(cart.taxPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        // src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      RS:{" "}
                      {(
                        item.qty *
                        (item.price - (item.price * item.discount) / 100)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-gray-100 rounded">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> RS:
                {itemsPrice.toFixed(2)}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> RS:
                {shippingPrice.toFixed(2)}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> RS:
                {taxPrice.toFixed(2)}
              </li>
              <li>
                <span className="font-semibold mb-4">Grand Total</span> RS:
                {totalPrice.toFixed(2)}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart?.shippingAddress?.address},{" "}
                {cart.shippingAddress?.city} {cart?.shippingAddress?.postalCode}
                , {cart?.shippingAddress?.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart?.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-[#436C68] hover:bg-[#436c68e6] text-white py-2 px-4 rounded text-lg w-full mt-4"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
