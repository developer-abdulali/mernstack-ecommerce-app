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
import { FaFilter, FaStar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router";

const Products = () => {
  const [ratingFilter, setRatingFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchInput = searchParams.get("search") || "";

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
    category: checked.length > 0 ? checked[0] : "",
    rating: ratingFilter,
    sort: sortFilter,
    minPrice,
    maxPrice,
    search: searchInput,
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
          (!maxPrice || product.price <= maxPrice) &&
          (!searchInput ||
            product.name.toLowerCase().includes(searchInput.toLowerCase()))
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
    searchInput,
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
    <div className="px-5">
      <div className="flex flex-col md:flex-row">
        {/* filters  */}
        <aside
          className={`w-[288px] p-4 bg-white sticky top-0 h-screen md:block ${
            isFilterOpen
              ? "block translate-x-0 z-10 w-full border"
              : "hidden -translate-x-full md:translate-x-0"
          } md:block`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium">Filters</h2>
            <button
              className="underline hidden md:flex"
              onClick={() => window.location.reload()}
            >
              Clear
            </button>
            <button
              className="underline md:hidden"
              onClick={() => setIsFilterOpen(false)}
            >
              <FaXmark />
            </button>
          </div>

          <div>
            <div>
              Price: & RS:{minPrice} - RS:{maxPrice}
            </div>
            <div className="flex justify-between">
              <span>Rs: 0</span>
              <span>Rs: 1500</span>
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

          <h2 className="mt-4 text-xl">Popular Brands</h2>
          <div>
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4"
                />
                <label htmlFor={brand} className="ml-2 text-base font-normal">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="mt-4 text-xl">Categories</h2>
          <div>
            {categories?.map((c) => (
              <div key={c._id} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4"
                />
                <label htmlFor={c._id} className="ml-2 text-base font-normal">
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mt-4 text-xl">Filter by Rating</h2>
            <div className="flex flex-col">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="radio"
                    id={`${rating}-star`}
                    name="rating"
                    value={rating}
                    checked={ratingFilter === rating.toString()}
                    onChange={handleRatingChange}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={`${rating}-star`}
                    className="flex items-center ml-2 text-base font-normal"
                  >
                    <span>{rating}</span>
                    <FaStar className="text-[#436C68] ml-1" />
                    <span className="ml-1">& above</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* sort by */}
          <div>
            <h2 className="mt-4 text-xl">Sort By</h2>
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-low-to-high"
                  name="sort"
                  value="price-low-to-high"
                  checked={sortFilter === "price-low-to-high"}
                  onChange={handleSortChange}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="price-low-to-high"
                  className="ml-2 text-base font-normal"
                >
                  Price - Low to High
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-high-to-low"
                  name="sort"
                  value="price-high-to-low"
                  checked={sortFilter === "price-high-to-low"}
                  onChange={handleSortChange}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="price-high-to-low"
                  className="ml-2 text-base font-normal"
                >
                  Price - High to Low
                </label>
              </div>
              <button
                className="md:hidden underline mt-2 w-full border bg-gray-100"
                onClick={() => window.location.reload()}
              >
                Clear
              </button>
            </div>
          </div>

          {/* others */}
          <div>
            <h2 className="mt-4 text-xl">Others</h2>
            <div className="flex flex-col">
              <div className="flex items-center">
                <input type="checkbox" name="sort" className="w-4 h-4" />
                <label className="ml-2 text-base font-normal">In Stock</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="sort" className="w-4 h-4" />
                <label className="ml-2 text-base font-normal">In Stock</label>
              </div>

              <button
                className="md:hidden underline mt-2 w-full border bg-gray-100"
                onClick={() => window.location.reload()}
              >
                Clear
              </button>
            </div>
          </div>
        </aside>

        <div className="p-2 md:p-5">
          <div className="flex items-center justify-between">
            {/* Button to toggle filter aside on small screens */}

            <h2 className="ml-2 md:text-xl font-medium">
              Showing {products?.length} of {filteredProductsQuery.data?.length}{" "}
              products
            </h2>
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="text-xl" />
            </button>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredProductsQuery.isLoading ? (
              <Loader />
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center">
                Whoops! We don't have any products that match your preference.
              </div>
            ) : (
              products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCard p={p} searchInput={searchInput} />
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
