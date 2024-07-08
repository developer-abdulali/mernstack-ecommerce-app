// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   saveShippingAddress,
//   savePaymentMethod,
//   saveReceipt,
// } from "../../redux/features/cart/cartSlice";
// import ProgressSteps from "../../components/ProgressSteps";

// const Shipping = () => {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [address, setAddress] = useState(shippingAddress.address || "");
//   const [city, setCity] = useState(shippingAddress.city || "");
//   const [postalCode, setPostalCode] = useState(
//     shippingAddress.postalCode || ""
//   );
//   const [country, setCountry] = useState(shippingAddress.country || "");
//   const [receipt, setReceipt] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!paymentMethod) {
//       alert("Please select a payment method");
//       return;
//     }
//     if (!receipt) {
//       alert("Please upload a payment proof");
//       return;
//     }

//     dispatch(saveShippingAddress({ address, city, postalCode, country }));
//     dispatch(savePaymentMethod(paymentMethod));
//     dispatch(saveReceipt(receipt));
//     navigate("/placeorder");
//   };

//   // Payment
//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate("/shipping");
//     }
//   }, [navigate, shippingAddress]);

//   return (
//     <div className="container mx-auto mt-10">
//       <ProgressSteps step1 step2 />
//       <div className="mt-[10rem] flex justify-around items-center flex-wrap">
//         <form onSubmit={submitHandler} className="w-[40rem]">
//           <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Address</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter address"
//               value={address}
//               required
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">City</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter city"
//               value={city}
//               required
//               onChange={(e) => setCity(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Postal Code</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter postal code"
//               value={postalCode}
//               required
//               onChange={(e) => setPostalCode(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Country</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Enter country"
//               value={country}
//               required
//               onChange={(e) => setCountry(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400">Select Method</label>
//             <div className="mt-2">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-pink-500"
//                   name="paymentMethod"
//                   value="JazzCash"
//                   checked={paymentMethod === "JazzCash"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 <span className="ml-2">JazzCash</span>
//               </label>
//               {paymentMethod === "JazzCash" && (
//                 <p className="text-gray-400">
//                   Account Number: 1234567890, Account Title: Your Name
//                 </p>
//               )}
//               <label className="inline-flex items-center ml-6">
//                 <input
//                   type="radio"
//                   className="form-radio text-pink-500"
//                   name="paymentMethod"
//                   value="EasyPaisa"
//                   checked={paymentMethod === "EasyPaisa"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 <span className="ml-2">EasyPaisa</span>
//               </label>
//               {paymentMethod === "EasyPaisa" && (
//                 <p className="text-gray-400">
//                   Account Number: 0987654321, Account Title: Your Name
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-white mb-2">Upload Receipt</label>
//             <input
//               type="file"
//               className="w-full p-2 border rounded"
//               onChange={(e) => setReceipt(e.target.files[0])}
//             />
//           </div>
//           <button
//             className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
//             type="submit"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Shipping;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
  saveReceipt,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [receipt, setReceipt] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod !== "CashOnDelivery" && !receipt) {
      alert("Please upload a payment proof");
      return;
    }

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    dispatch(saveReceipt(receipt));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10 px-4">
      <ProgressSteps step1 step2 />
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8">Shipping</h1>
        <form onSubmit={submitHandler} className="w-full max-w-md">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Select Method
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="JazzCash"
                  checked={paymentMethod === "JazzCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">JazzCash</span>
              </label>
              {paymentMethod === "JazzCash" && (
                <p className="text-gray-700 text-sm">
                  Account Number: 1234567890, Account Title: Your Name
                </p>
              )}
              <label className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="EasyPaisa"
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">EasyPaisa</span>
              </label>
              {paymentMethod === "EasyPaisa" && (
                <p className="text-gray-700 text-sm">
                  Account Number: 0987654321, Account Title: Your Name
                </p>
              )}
              <label className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === "CashOnDelivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Cash On Delivery</span>
              </label>
            </div>
          </div>
          {paymentMethod !== "CashOnDelivery" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="receipt"
              >
                Upload Receipt
              </label>
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="receipt"
                onChange={(e) => setReceipt(e.target.files[0])}
              />
            </div>
          )}
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
