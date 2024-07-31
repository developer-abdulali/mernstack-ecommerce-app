import React from "react";

const AllProductsSkeleton = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
          ))}
        </div>
      </div>
    </section>
    // <div className="flex justify-center items-center h-screen">
    //   <div className="text-xl font-semibold">Loading...</div>
    // </div>
  );
};

export default AllProductsSkeleton;
