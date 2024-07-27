// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
// import {
//   setCategories,
//   setProducts,
//   setChecked,
// } from "../redux/features/shop/shopSlice";
// import Loader from "../components/Loader";
// import ProductCard from "./Products/ProductCard";

// const Products = () => {
//   const [ratingFilter, setRatingFilter] = useState("");
//   const dispatch = useDispatch();
//   const { categories, products, checked, radio } = useSelector(
//     (state) => state.shop
//   );

//   const categoriesQuery = useFetchCategoriesQuery();
//   const [priceFilter, setPriceFilter] = useState("");
//   const [sortFilter, setSortFilter] = useState("");

//   const filteredProductsQuery = useGetFilteredProductsQuery({
//     checked,
//     radio,
//     category: checked.length > 0 ? checked[0] : "",
//     rating: ratingFilter,
//     sort: sortFilter,
//   });

//   // Add a new function to handle rating change
//   const handleRatingChange = (e) => {
//     setRatingFilter(e.target.value);
//   };

//   // Add a new function to handle sort change
//   const handleSortChange = (e) => {
//     setSortFilter(e.target.value);
//   };

//   useEffect(() => {
//     if (!categoriesQuery.isLoading) {
//       dispatch(setCategories(categoriesQuery.data));
//     }
//   }, [categoriesQuery.data, dispatch]);

//   useEffect(() => {
//     if (filteredProductsQuery.isSuccess) {
//       const filteredProducts = filteredProductsQuery.data.filter((product) => {
//         return (
//           (product.price.toString().includes(priceFilter) ||
//             product.price === parseInt(priceFilter, 10)) &&
//           (!ratingFilter || product.rating >= ratingFilter)
//         );
//       });

//       // Sort the products based on the sortFilter state
//       if (sortFilter === "price-low-to-high") {
//         filteredProducts.sort((a, b) => a.price - b.price);
//       } else if (sortFilter === "price-high-to-low") {
//         filteredProducts.sort((a, b) => b.price - a.price);
//       }

//       dispatch(setProducts(filteredProducts));
//     }
//   }, [
//     checked,
//     radio,
//     filteredProductsQuery.data,
//     dispatch,
//     priceFilter,
//     ratingFilter,
//     sortFilter,
//   ]);

//   const handleBrandClick = (brand) => {
//     const productsByBrand = filteredProductsQuery.data?.filter(
//       (product) => product.brand === brand
//     );
//     dispatch(setProducts(productsByBrand));
//   };

//   const handleCheck = (value, id) => {
//     const updatedChecked = value
//       ? [...checked, id]
//       : checked.filter((c) => c !== id);
//     dispatch(setChecked(updatedChecked));
//   };

//   const uniqueBrands = [
//     ...Array.from(
//       new Set(
//         filteredProductsQuery.data
//           ?.map((product) => product.brand)
//           .filter((brand) => brand !== undefined)
//       )
//     ),
//   ];

//   const handlePriceChange = (e) => {
//     setPriceFilter(e.target.value);
//   };

//   return (
//     <>
//       {/* <div className="container mx-auto"> */}
//       <div className="">
//         <div className="flex flex-col md:flex-row ">
//           <div className="p-3 mb-2 md:w-1/6">
//             <div className="flex items-center justify-between">
//               <h2 className="h4 py-2 rounded-full mb-2 ml-4 font-medium text-3xl">
//                 Filters
//               </h2>

//               <button
//                 className="underline"
//                 onClick={() => window.location.reload()}
//               >
//                 Clear
//               </button>
//             </div>
//             <h2 className="h4 py-2 rounded-full mb-2 ml-4">Popular Brands</h2>
//             <div className="pl-4">
//               {uniqueBrands?.map((brand) => (
//                 <div key={brand} className="flex items-center mr-4">
//                   <input
//                     type="checkbox"
//                     id={brand}
//                     name="brand"
//                     onChange={() => handleBrandClick(brand)}
//                     className="w-4 h-4 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="pink-radio"
//                     className="ml-2 text-base font-normal dark:text-gray-300"
//                   >
//                     {brand}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <h2 className="mt-2 h4 py-2 rounded-full ml-4">Categories</h2>
//             <div className="pl-4">
//               {categories?.map((c) => (
//                 <div key={c._id} className="">
//                   <div className="flex items-center mr-4">
//                     <input
//                       type="checkbox"
//                       id="red-checkbox"
//                       onChange={(e) => handleCheck(e.target.checked, c._id)}
//                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label
//                       htmlFor="pink-checkbox"
//                       className="ml-2 text-base font-normal dark:text-gray-300"
//                     >
//                       {c.name}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* Filter by Rating */}
//             <div>
//               <h2 className="h4 ml-4 py-2 rounded-full">Filter by Rating</h2>
//               <div className="flex flex-col justify-center pl-4">
//                 {[5, 4, 3, 2, 1].map((rating) => (
//                   <div key={rating} className="flex items-center mr-4">
//                     <input
//                       type="radio"
//                       id={`${rating}-star`}
//                       name="rating"
//                       value={rating}
//                       checked={ratingFilter === rating.toString()}
//                       onChange={handleRatingChange}
//                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label
//                       htmlFor={`${rating}-star`}
//                       className="ml-2 text-base font-normal dark:text-gray-300"
//                     >
//                       {rating} ★ & above
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Filter sort by hight to low or low to high */}
//             <div>
//               <h2 className="h4 py-2 ml-4 rounded-full">Sort By</h2>
//               <div className="flex flex-col justify-center">
//                 <div className="flex items-center ml-4">
//                   <input
//                     type="radio"
//                     id="price-low-to-high"
//                     name="sort"
//                     value="price-low-to-high"
//                     checked={sortFilter === "price-low-to-high"}
//                     onChange={handleSortChange}
//                     className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="price-low-to-high"
//                     className="ml-2 text-base font-normal dark:text-gray-300"
//                   >
//                     Price - Low to High
//                   </label>
//                 </div>
//                 <div className="flex items-center ml-4">
//                   <input
//                     type="radio"
//                     id="price-high-to-low"
//                     name="sort"
//                     value="price-high-to-low"
//                     checked={sortFilter === "price-high-to-low"}
//                     onChange={handleSortChange}
//                     className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="price-high-to-low"
//                     className="ml-2 text-base font-normal dark:text-gray-300"
//                   >
//                     Price - High to Low
//                   </label>
//                 </div>
//               </div>
//             </div>
//             {/* filter by price */}
//             {/* <h2 className="h4 text-center py-2 rounded-full mb-2">
//               Filter by Price
//             </h2>
//             <div className="p-5">
//               <input
//                 type="text"
//                 placeholder="Enter Price"
//                 value={priceFilter}
//                 onChange={handlePriceChange}
//                 className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
//               />
//             </div> */}
//           </div>
//           <div className="p-7">
//             <h2 className="h4 mb-2 text-xl font-medium">
//               Showing {products?.length} products from{" "}
//               {filteredProductsQuery.data?.length} total products
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
//               {products.length === 0 ? (
//                 <Loader />
//               ) : (
//                 products?.map((p) => (
//                   <div className="p-3" key={p._id}>
//                     <ProductCard p={p} />
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Products = () => {
  const [ratingFilter, setRatingFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
    category: checked.length > 0 ? checked[0] : "",
    rating: ratingFilter,
    sort: sortFilter,
    minPrice,
    maxPrice,
  });

  // Add a new function to handle rating change
  const handleRatingChange = (e) => {
    setRatingFilter(e.target.value);
  };

  // Add a new function to handle sort change
  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
  };
  // Add a new function to handle price range change
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);
  useEffect(() => {
    if (filteredProductsQuery.isSuccess) {
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return (
          (!ratingFilter || product.rating >= ratingFilter) &&
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice)
        );
      });

      // Sort the products based on the sortFilter state
      if (sortFilter === "price-low-to-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortFilter === "price-high-to-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      dispatch(setProducts(filteredProducts));
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    ratingFilter,
    sortFilter,
    minPrice,
    maxPrice,
  ]);
  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row ">
        <div className="p-3 mb-2 md:w-1/6">
          <div className="flex items-center justify-between">
            <h2 className="h4 py-2 rounded-full mb-2 ml-4 font-medium text-3xl">
              Filters
            </h2>

            <button
              className="underline"
              onClick={() => window.location.reload()}
            >
              Clear
            </button>
          </div>

          <div className="ml-4">
            <div className="">
              Price: &#8377;{minPrice} - &#8377;{maxPrice}
            </div>
            <div className="filter-value">
              <div className="filter-price">
                <span>&#8377; 0</span>
                <span> &#8377; 1500 </span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="300"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                list="steplist"
                className="w-full"
              />
              <datalist id="steplist">
                <option>0</option>
                <option>300</option>
                <option>600</option>
                <option>900</option>
                <option>1200</option>
                <option>1500</option>
              </datalist>
            </div>
          </div>

          <h2 className="h4 py-2 rounded-full mb-2 ml-4">Popular Brands</h2>
          <div className="pl-4">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center mr-4">
                <input
                  type="checkbox"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="pink-radio"
                  className="ml-2 text-base font-normal dark:text-gray-300"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
          <h2 className="mt-2 h4 py-2 rounded-full ml-4">Categories</h2>
          <div className="pl-4">
            {categories?.map((c) => (
              <div key={c._id} className="">
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id="red-checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="pink-checkbox"
                    className="ml-2 text-base font-normal dark:text-gray-300"
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Filter by Rating */}
          <div>
            <h2 className="h4 ml-4 py-2 rounded-full">Filter by Rating</h2>
            <div className="flex flex-col justify-center pl-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mr-4">
                  <input
                    type="radio"
                    id={`${rating}-star`}
                    name="rating"
                    value={rating}
                    checked={ratingFilter === rating.toString()}
                    onChange={handleRatingChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`${rating}-star`}
                    className="ml-2 text-base font-normal dark:text-gray-300"
                  >
                    {rating} ★ & above
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Filter sort by hight to low or low to high */}
          <div>
            <h2 className="h4 py-2 ml-4 rounded-full">Sort By</h2>
            <div className="flex flex-col justify-center">
              <div className="flex items-center ml-4">
                <input
                  type="radio"
                  id="price-low-to-high"
                  name="sort"
                  value="price-low-to-high"
                  checked={sortFilter === "price-low-to-high"}
                  onChange={handleSortChange}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-low-to-high"
                  className="ml-2 text-base font-normal dark:text-gray-300"
                >
                  Price - Low to High
                </label>
              </div>
              <div className="flex items-center ml-4">
                <input
                  type="radio"
                  id="price-high-to-low"
                  name="sort"
                  value="price-high-to-low"
                  checked={sortFilter === "price-high-to-low"}
                  onChange={handleSortChange}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="price-high-to-low"
                  className="ml-2 text-base font-normal dark:text-gray-300"
                >
                  Price - High to Low
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="p-7">
          <h2 className="h4 mb-2 text-xl font-medium">
            Showing {products?.length} products from{" "}
            {filteredProductsQuery.data?.length} total products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {products.length === 0 ? (
              <p className="flex items-center justify-center">
                Whoops! We don't have any products that match your preference.
              </p>
            ) : (
              // <Loader />
              products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
