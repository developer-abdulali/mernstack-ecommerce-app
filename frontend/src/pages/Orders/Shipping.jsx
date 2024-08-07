import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
  saveReceipt,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingAddress.phoneNumber || ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
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

    const reader = new FileReader();

    if (receipt && paymentMethod !== "CashOnDelivery") {
      reader.readAsDataURL(receipt);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log("Dispatching saveShippingAddress with:", {
          address,
          city,
          postalCode,
          phoneNumber,
        });
        dispatch(
          saveShippingAddress({ address, city, postalCode, phoneNumber })
        );
        dispatch(savePaymentMethod(paymentMethod));
        dispatch(saveReceipt(base64data));
        navigate("/placeorder");
      };
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }));
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    }
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-8 px-4 max-w-4xl">
      <ProgressSteps step1 step2 />
      <div className="mt-10">
        <h1 className="text-3xl font-semibold mb-8 text-center">Shipping</h1>
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#436C68]"
              id="address"
              placeholder="Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#436C68]"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="md:w-1/2 md:mr-2 mb-4 md:mb-0">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#436C68]"
                id="city"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 md:ml-2">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#436C68]"
                id="postalCode"
                placeholder="Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Payment Methods
            </label>
            <div className="mt-2 space-y-2">
              {["NayaPay", "CashOnDelivery"].map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio custom-accent"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2">{method}</span>
                </label>
              ))}
            </div>
            {paymentMethod === "NayaPay" && (
              <div className="text-gray-600 text-sm mt-2">
                <p className="my-2"> Account Number: +92 333 1234567</p>
                <p> Account Title: Owner AC Title</p>
              </div>
            )}
          </div>

          {paymentMethod && paymentMethod !== "CashOnDelivery" && (
            <div className="mb-6">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="receipt"
              >
                Upload Receipt
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-[#436C68] border-dashed hover:bg-gray-100 hover:cursor-pointer hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-[#436C68] group-hover:text-gray-600">
                      {receipt ? receipt?.name : "Attach a file"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    id="receipt"
                    accept="image/*"
                    onChange={(e) => setReceipt(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          )}

          <button
            className="bg-[#436C68] text-white font-semibold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-[#436c68ea] transition duration-300"
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
