import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import AllProductsSkeleton from "../../components/AllProductsSkeleton/AllProductsSkeleton";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const { data: products, refetch, isLoading, isError } = useAllProductsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <AllProductsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">
          Error loading products
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Products ({products?.length})
      </div>
      {products?.length === 0 && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/admin/productlist")}
            className=" mt-4 px-4 py-2 bg-[#436C68] text-white rounded hover:bg-[#436c68e7]"
          >
            Create Product
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div
            key={product?._id}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/admin/product/update/${product?._id}`}>
              <div className="relative">
                <img
                  src={`http://localhost:5000${product?.image}`}
                  alt={product?.name}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105 duration-300"
                />
                <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50 text-white text-xs rounded-br-lg">
                  {moment(product?.createdAt).format("MMMM Do YYYY")}
                </div>
              </div>
            </Link>
            <div className="p-4 flex flex-col">
              <h5 className="text-xl font-semibold mb-2 text-gray-800">
                {product?.name?.length > 20
                  ? `${product?.name.substring(0, 20)}...`
                  : product?.name}
              </h5>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-lg font-semibold text-[#436C68]">
                  Rs: {product?.price}
                  {/* Rs: {calculateDiscountedPrice} */}
                </p>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium bg-[#436C68] hover:bg-[#436c68e6] text-white rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-pink-300 transition-all duration-300"
                  >
                    Update
                    <FaArrowRightLong className="w-3.5 h-3.5 ml-2" />
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
