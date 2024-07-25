import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";

const HorizontalCard = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  console.log(data.products[0].image);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
      {data.products.slice(0, 4).map((product) => (
        <div
          key={product._id}
          className="flex flex-col md:flex-row items-center p-2 border border-[#436C68] rounded-md mb-4 w-[922px] h-[216px]"
        >
          <img
            src={`http://localhost:5000${product?.image}`}
            className="w-40 h-40"
            alt={product.name}
          />

          <div className="flex-1 pl-0 md:pl-4">
            <Link to={`/product/${product._id}`}>
              <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">
                {product.brand}
              </div>

              <p className="text-lg font-medium mb-2">{product.name}</p>

              <div className="text-xl font-bold mb-4">RS: {product.price}</div>
            </Link>

            <button className="w-full px-4 py-2 text-white bg-[#436C68] rounded-md hover:bg-[#436c68e8] disabled:opacity-80 disabled:cursor-not-allowed">
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HorizontalCard;
