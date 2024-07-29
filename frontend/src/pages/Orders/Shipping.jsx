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
  const [receipt, setReceipt] = useState(null);
  const [showNayaPayDetails, setShowNayaPayDetails] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (!paymentMethod) {
  //     alert("Please select a payment method");
  //     return;
  //   }

  //   if (paymentMethod !== "CashOnDelivery" && !receipt) {
  //     alert("Please upload a payment proof");
  //     return;
  //   }

  //   dispatch(saveShippingAddress({ address, city, postalCode }));
  //   dispatch(savePaymentMethod(paymentMethod));
  //   dispatch(saveReceipt(receipt));
  //   navigate("/placeorder");
  // };
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

    const reader = new FileReader();
    reader.readAsDataURL(receipt);
    reader.onloadend = () => {
      const base64data = reader.result;
      dispatch(saveShippingAddress({ address, city, postalCode }));
      dispatch(savePaymentMethod(paymentMethod));
      dispatch(saveReceipt(base64data));
      navigate("/placeorder");
    };
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
              placeholder="address"
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
              placeholder="city"
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
              placeholder="postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
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
                  value="NayaPay"
                  checked={paymentMethod === "NayaPay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-1">NayaPay</span>
              </label>
              {paymentMethod === "NayaPay" && (
                <p className="text-gray-300 text-sm">
                  Account Number: +92 305 2879926, Account Title: Abdul Ali
                </p>
              )}
              <label className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500 ml-3"
                  name="paymentMethod"
                  value="EasyPaisa"
                  checked={paymentMethod === "EasyPaisa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-1">EasyPaisa</span>
              </label>
              {paymentMethod === "EasyPaisa" && (
                <p className="text-gray-700 text-sm">
                  Account Number: 0987654321, Account Title: Your Name
                </p>
              )}
              <label className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500 ml-3"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === "CashOnDelivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-1">Cash On Delivery</span>
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
            className="bg-[#436C68] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-[#436c68ea]"
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
