// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { useAllProductsQuery } from "../../redux/api/productApiSlice";
// import AdminMenu from "./AdminMenu";

// const AllProducts = () => {
//   const { data: products, refetch, isLoading, isError } = useAllProductsQuery();

//   // Call refetch only once on mount
//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading products</div>;
//   }

//   return (
//     <>
//       <div className="container mx-[9rem]">
//         <div className="flex flex-col md:flex-row">
//           <div className="p-3">
//             <div className="ml-[2rem] text-xl font-bold h-12">
//               All Products ({products.length})
//             </div>
//             <div className="flex flex-wrap justify-around items-center">
//               {products.map((product) => (
//                 <Link
//                   key={product._id}
//                   to={`/admin/product/update/${product._id}`}
//                   className="block mb-4 overflow-hidden"
//                 >
//                   <div className="flex">
//                     <img
//                       src={`http://localhost:5000${product?.image}`}
//                       // src={`http://localhost:5000${product.image}`}
//                       // src={product.image}
//                       alt={product.name}
//                       className="w-[10rem] object-cover"
//                     />
//                     <div className="p-4 flex flex-col justify-around">
//                       <div className="flex justify-between">
//                         <h5 className="text-xl font-semibold mb-2">
//                           {product?.name}
//                         </h5>
//                         <p className="text-gray-400 text-xs">
//                           {moment(product.createdAt).format("MMMM Do YYYY")}
//                         </p>
//                       </div>
//                       <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
//                         {product?.description?.substring(0, 160)}...
//                       </p>
//                       <div className="flex justify-between">
//                         <Link
//                           to={`/admin/product/update/${product._id}`}
//                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
//                         >
//                           Update Product
//                           <svg
//                             className="w-3.5 h-3.5 ml-2"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 14 10"
//                           >
//                             <path
//                               stroke="currentColor"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M1 5h12m0 0L9 1m4 4L9 9"
//                             />
//                           </svg>
//                         </Link>
//                         <p>$ {product?.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllProducts;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { FaCartPlus } from "react-icons/fa";

const AllProducts = () => {
  const { data: products, refetch, isLoading, isError } = useAllProductsQuery();

  // Call refetch only once on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="text-xl font-semibold text-white">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="text-xl font-semibold text-red-200">
          Error loading products
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Products ({products.length})
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/admin/product/update/${product._id}`}>
              <div className="relative">
                <img
                  src={`http://localhost:5000${product?.image}`}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform transform hover:scale-105 duration-300"
                />
                <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50 text-white text-xs rounded-br-lg">
                  {moment(product.createdAt).format("MMMM Do YYYY")}
                </div>
              </div>
            </Link>
            <div className="p-4 flex flex-col">
              <h5 className="text-xl font-semibold mb-2 text-gray-800">
                {product?.name}
              </h5>
              <p className="text-gray-600 text-sm mb-4">
                {product?.description?.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-lg font-semibold text-pink-700">
                  Rs: {product?.price}
                </p>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300"
                  >
                    Update
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
