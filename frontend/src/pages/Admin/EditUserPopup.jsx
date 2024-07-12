import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const EditUserPopup = ({ user, togglePopup, updateHandler }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    updateHandler(user._id, username, email);
    togglePopup();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Update User
            </h3>
            <button
              type="button"
              onClick={togglePopup}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaXmark />
            </button>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-5 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-left sm:mt-0 sm:text-left w-full">
                <div className="mt-2">
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Username"
                  />
                  <label className="text-sm font-medium text-gray-700 mt-4">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={togglePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
