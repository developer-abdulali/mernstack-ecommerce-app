import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  return (
    <div className="mt-12 bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-6 font-bold tracking-tight text-gray-900">
          Name : {user.nam ? user.name : "New user"}
        </h1>
        <h3 className="text-xl my-6 font-bold tracking-tight text-red-900">
          Email Address: {user.email}
        </h3>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
        {user.addresses.map((address) => (
          <div className="flex justify-between gap-x-6 py-5 border my-2 px-3">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {address.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {address.street}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {address.pinCode}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                Phone: {address.phone}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
