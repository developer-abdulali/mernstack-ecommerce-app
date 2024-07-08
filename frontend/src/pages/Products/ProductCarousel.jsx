import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => {
              // Construct the full URL for the image
              const imageUrl = `http://localhost:5000${image}`;

              return (
                <div key={_id}>
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[30rem]"
                  />

                  <div className="mt-4 flex justify-between w-[20rem]">
                    <div className="one">
                      <h2>{name}</h2>
                      <p> RS: {price}</p> <br /> <br />
                      <p className="w-[25rem]">
                        {description.substring(0, 170)} ...
                      </p>
                    </div>

                    <div className="flex justify-between w-[20rem]">
                      <div className="one">
                        <p className="flex items-center mb-6 w-[8rem]">
                          <FaStore className="mr-2 text-white" /> Brand: {brand}
                        </p>
                        <p className="flex items-center mb-6 w-[15rem]">
                          <FaClock className="mr-2 text-white" /> Added:{" "}
                          {moment(createdAt).fromNow()}
                        </p>
                        <p className="flex items-center mb-6 w-[8rem]">
                          <FaStar className="mr-2 text-white" /> Reviews:{" "}
                          {numReviews}
                        </p>
                      </div>

                      <div className="two">
                        <p className="flex items-center mb-6 w-[5rem]">
                          <FaStar className="mr-2 text-white" /> Ratings:
                          {Math.round(rating)}
                        </p>
                        <p className="flex items-center mb-6 ">
                          <FaShoppingCart className="mr-2 text-white" />
                          Quantity: {quantity}
                        </p>
                        <p className="flex items-center mb-6 w-[10rem]">
                          <FaBox className="mr-2 text-white" /> In Stock:
                          {countInStock}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
