import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
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
            <HorizontalCard />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
