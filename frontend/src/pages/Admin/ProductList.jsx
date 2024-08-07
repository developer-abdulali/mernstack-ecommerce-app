import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  setPrice,
  setDiscount,
  calculateDiscountedPrice,
} from "../../redux/features/shop/shopSlice";
import { useDispatch } from "react-redux";

const ProductForm = ({
  fieldName,
  label,
  type,
  value,
  onChange,
  placeholder,
}) => (
  <div className="form-group mb-4">
    <label className="block text-gray-700 font-semibold mb-2">{label}</label>
    <input
      type={type}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const ProductList = () => {
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPriceState] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [discount, setDiscountState] = useState(0);
  const [additionalImageUrls, setAdditionalImageUrls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("mainImage", image);
    additionalImages.forEach((img) => {
      formData.append("additionalImages", img);
    });
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("countInStock", stock);
    formData.append("discount", discount);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`${response?.data?.message} is created`);
      navigate("/");
      // Reset form data
      setImage(null);
      setAdditionalImages([]);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setStock("");
      setDiscount("");
    } catch (error) {
      toast.error("Product creation failed. Try Again.");
    }
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadAdditionalFilesHandler = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPriceState(price);
    dispatch(setPrice(price));
    dispatch(calculateDiscountedPrice());
  };

  const handleDiscountChange = (e) => {
    const discount = e.target.value;
    setDiscountState(discount);
    dispatch(setDiscount(discount));
    dispatch(calculateDiscountedPrice());
  };

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Create Product
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              {image && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product"
                    className="mx-auto max-h-48 rounded-lg shadow-lg"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <span className="sr-only">Choose product image</span>
                  <div className="flex items-center justify-center w-full">
                    <label
                      title={`Upload Main Image`}
                      className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
                        <p className="text-sm text-gray-500 text-center">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input
                        id="mainImage"
                        name="mainImage"
                        type="file"
                        className="hidden"
                        onChange={uploadFileHandler}
                      />
                    </label>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold mb-4">Additional Images</h2>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <label
                    key={index}
                    title={`Upload Additional Image`}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 text-[#436C68] mb-2" />
                      <p className="text-xs text-gray-500 text-center">
                        Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={uploadAdditionalFilesHandler}
                      multiple
                    />
                  </label>
                ))}
              </div>
              {additionalImages.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Uploaded Additional Images
                  </h3>
                  <div className="grid grid-cols-4 gap-1">
                    {/* <div className="grid grid-cols-3 gap-2"> */}
                    {additionalImages?.map((img, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt={`additional ${index}`}
                        title={`Additional image`}
                        className="h-20 object-cover rounded-md shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProductForm
              fieldName="name"
              placeholder="Product name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ProductForm
              fieldName="description"
              placeholder="Product description"
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-group mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <ProductForm
              fieldName="brand"
              placeholder="Brand"
              label="Brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ProductForm
              fieldName="price"
              placeholder="Price"
              label="Price"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
            <ProductForm
              fieldName="stock"
              placeholder="Stock"
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <ProductForm
              fieldName="discount"
              placeholder="Discount (%)"
              label="Discount"
              type="number"
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>

          <div className="mb-8">
            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">
                Discounted Price
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-100 focus:outline-none"
                value={discountedPrice.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3  text-white font-bold rounded-lg shadow-lg bg-[#436C68] hover:bg-[#436c68e6] transition-all duration-300 transform hover:scale-105"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
