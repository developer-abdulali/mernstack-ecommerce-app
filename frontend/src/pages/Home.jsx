import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./Products/Product";
import Hero from "../components/Hero";
import HorizontalCard from "../components/HorizontalCard/HorizontalCard";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      <Hero />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div>
            <div className="text-4xl text-center my-10 font-normal">
              Featured:
            </div>
            {/* {data.products.map((product) => (
              <div key={product._id}> */}
            <HorizontalCard />
            {/* </div> */}
            {/* ))} */}
          </div>
          {/* <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default Home;
