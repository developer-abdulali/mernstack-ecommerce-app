import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const AddUserPopup = ({ togglePopup, submitHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      {/* bg-gray-900 sets the color of the background, bg-opacity-50 sets the opacity */}
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between border-b mb-4">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Add User
          </h2>
          <button
            type="button"
            onClick={togglePopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaXmark />
          </button>
        </div>
        <form
          onSubmit={(e) =>
            submitHandler(e, username, email, password, confirmPassword)
          }
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={togglePopup}
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPopup;
