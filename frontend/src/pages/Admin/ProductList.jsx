// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import { FaUpload } from "react-icons/fa";
// import {
//   setPrice,
//   setDiscount,
//   calculateDiscountedPrice,
// } from "../../redux/features/shop/shopSlice";

// const ProductForm = ({
//   fieldName,
//   label,
//   type,
//   value,
//   onChange,
//   placeholder,
// }) => (
//   <div className="form-group mb-4">
//     <label className="block text-gray-700 font-semibold mb-2">{label}</label>
//     <input
//       type={type}
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//     />
//   </div>
// );

// const ProductList = () => {
//   const [image, setImage] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPriceState] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState(0);
//   const [discount, setDiscountState] = useState(0);
//   const [imageUrl, setImageUrl] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const productData = new FormData();
//       productData.append("image", image);
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("category", category);
//       productData.append("brand", brand);
//       productData.append("countInStock", stock);
//       productData.append("discount", discount);

//       const { data } = await createProduct(productData);

//       if (data.error) {
//         toast.error("Product creation failed. Try Again.");
//       } else {
//         toast.success(`${data.name} is created`);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error("Product creation failed. Try Again.");
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image);
//       setImageUrl(res.image);
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   const handlePriceChange = (e) => {
//     const price = e.target.value;
//     setPriceState(price);
//     dispatch(setPrice(price));
//     dispatch(calculateDiscountedPrice());
//   };

//   const handleDiscountChange = (e) => {
//     const discount = e.target.value;
//     setDiscountState(discount);
//     dispatch(setDiscount(discount));
//     dispatch(calculateDiscountedPrice());
//   };

//   const discountedPrice = price - (price * discount) / 100;

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="px-6 py-8">
//           <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
//             Create Product
//           </h1>

//           {imageUrl && (
//             <div className="text-center mb-8">
//               <img
//                 src={`http://localhost:5000${imageUrl}`}
//                 alt="product"
//                 className="mx-auto max-h-48 rounded-md shadow-md"
//               />
//             </div>
//           )}

//           <div className="mb-8">
//             <label className="block text-gray-700 font-medium mb-2">
//               <span className="sr-only">Choose product image</span>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
//                     <p className="text-sm text-gray-500 text-center">
//                       <span className="font-semibold">Click to upload</span>
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </div>
//                   <input
//                     id="image"
//                     name="image"
//                     type="file"
//                     className="hidden"
//                     onChange={uploadFileHandler}
//                   />
//                 </label>
//               </div>
//             </label>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//             <ProductForm
//               fieldName="name"
//               placeholder="Product name"
//               label="Name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <ProductForm
//               fieldName="price"
//               placeholder="Product price"
//               label="Price (RS)"
//               type="number"
//               value={price}
//               onChange={handlePriceChange}
//             />
//             <ProductForm
//               fieldName="brand"
//               placeholder="Product brand"
//               label="Brand"
//               type="text"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//             />
//             <ProductForm
//               fieldName="stock"
//               label="Count In Stock"
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//             />
//             <ProductForm
//               fieldName="discount"
//               label="Discount (%)"
//               type="number"
//               value={discount}
//               onChange={handleDiscountChange}
//             />
//             <div className="form-group">
//               <label
//                 htmlFor="category"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Category
//               </label>
//               <select
//                 id="category"
//                 className="shadow appearance-none border text-gray-700 leading-tight focus:shadow-outline w-full bg-gray-50 rounded-md py-2 px-3 focus:outline-none transition duration-200"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select a category</option>
//                 {categories?.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c?.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mb-8">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               placeholder="Product description..."
//               className="shadow appearance-none border leading-tight focus:outline-none focus:shadow-outline w-full bg-gray-50 text-gray-700 rounded-md py-2 px-3 transition duration-200"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="4"
//             ></textarea>
//           </div>

//           <div className="mb-8">
//             <p className="text-gray-700">
//               <strong>Discounted Price (RS): </strong>
//               <span className="text-green-500 font-semibold text-lg">
//                 {discountedPrice.toFixed(2)}
//               </span>
//             </p>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#436C68] hover:bg-[#436c68e1] text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl"
//           >
//             Add Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// running code
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import {
  setPrice,
  setDiscount,
  calculateDiscountedPrice,
} from "../../redux/features/shop/shopSlice";

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
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPriceState] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [discount, setDiscountState] = useState(0);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // 3rd code
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("mainImage", mainImage);
      additionalImages.forEach((image) => {
        productData.append("additionalImages", image);
      });
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("discount", discount);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Product creation failed. Try Again.");
    }
  };

  // 2nd code
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const productData = new FormData();
  //     productData.append("mainImage", mainImage);
  //     additionalImages.forEach((image) => {
  //       productData.append("additionalImages", image);
  //     });
  //     productData.append("name", name);
  //     productData.append("description", description);
  //     productData.append("price", price);
  //     productData.append("category", category);
  //     productData.append("brand", brand);
  //     productData.append("countInStock", stock);
  //     productData.append("discount", discount);

  //     console.log([...productData.entries()]);

  //     const { data } = await createProduct(productData);

  //     if (data.error) {
  //       toast.error("Product creation failed. Try Again.");
  //     } else {
  //       toast.success(`${data.name} is created`);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error("Product creation failed. Try Again.");
  //   }
  // };

  //1st code
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const productData = new FormData();
  //     productData.append("mainImage", mainImage);
  //     additionalImages.forEach((image) => {
  //       formData.append("additionalImages", image);
  //     });
  //     productData.append("name", name);
  //     productData.append("description", description);
  //     productData.append("price", price);
  //     productData.append("category", category);
  //     productData.append("brand", brand);
  //     productData.append("countInStock", stock);
  //     productData.append("discount", discount);

  //     const { data } = await createProduct(productData);

  //     if (data.error) {
  //       toast.error("Product creation failed. Try Again.");
  //     } else {
  //       toast.success(`${data.name} is created`);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error("Product creation failed. Try Again.");
  //   }
  // };
  // 2nd code
  const uploadFileHandler = async (e, isMain = true) => {
    const formData = new FormData();
    if (isMain) {
      formData.append("mainImage", e.target.files[0]);
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("additionalImages", e.target.files[i]);
      }
    }

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      if (isMain) {
        setMainImage(res.mainImage);
        setMainImageUrl(res.mainImage);
      } else {
        setAdditionalImages((prev) => [...prev, ...res.additionalImages]);
        setAdditionalImageUrls((prev) => [...prev, ...res.additionalImages]);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // 1st code
  // const uploadFileHandler = async (e, isMain = true) => {
  //   const formData = new FormData();
  //   if (isMain) {
  //     formData.append("mainImage", e.target.files[0]);
  //   } else {
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       formData.append("additionalImages", e.target.files[i]);
  //     }
  //   }

  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     toast.success(res.message);
  //     if (isMain) {
  //       setMainImage(res.mainImage);
  //       setMainImageUrl(res.mainImage);
  //     } else {
  //       setAdditionalImages((prev) => [...prev, ...res.additionalImages]);
  //       setAdditionalImageUrls((prev) => [...prev, ...res.additionalImages]);
  //     }
  //   } catch (error) {
  //     toast.error(error?.data?.message || error.error);
  //   }
  // };

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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Create Product
          </h1>

          {mainImageUrl && (
            <div className="text-center mb-8">
              <img
                src={`http://localhost:5000/${mainImageUrl}`}
                // src={`http://localhost:5000/uploads/${mainImageUrl}`}
                alt="main product"
                className="mx-auto max-h-48 rounded-md shadow-md"
              />
            </div>
          )}

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              <span className="sr-only">Choose main product image</span>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
                    <p className="text-sm text-gray-500 text-center">
                      <span className="font-semibold">
                        Click to upload main image
                      </span>
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
                    onChange={(e) => uploadFileHandler(e, true)}
                  />
                </label>
              </div>
            </label>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              <span className="sr-only">Choose additional product images</span>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
                    <p className="text-sm text-gray-500 text-center">
                      <span className="font-semibold">
                        Click to upload additional images (up to 4)
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                  <input
                    id="additionalImages"
                    name="additionalImages"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => uploadFileHandler(e, false)}
                  />
                </label>
              </div>
            </label>
          </div>

          {additionalImageUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {additionalImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${url}`}
                  // src={`http://localhost:5000/uploads/${url}`}
                  alt={`additional product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md shadow-md"
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <ProductForm
              fieldName="name"
              placeholder="Product name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ProductForm
              fieldName="price"
              placeholder="Product price"
              label="Price (RS)"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
            <ProductForm
              fieldName="brand"
              placeholder="Product brand"
              label="Brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <ProductForm
              fieldName="stock"
              label="Count In Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <ProductForm
              fieldName="discount"
              label="Discount (%)"
              type="number"
              value={discount}
              onChange={handleDiscountChange}
            />
            <div className="form-group">
              <label
                htmlFor="category"
                className="block text-gray-700 font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                className="shadow appearance-none border text-gray-700 leading-tight focus:shadow-outline w-full bg-gray-50 rounded-md py-2 px-3 focus:outline-none transition duration-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                  <option key={c?._id} value={c?._id}>
                    {c?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Product description..."
              className="shadow appearance-none border leading-tight focus:outline-none focus:shadow-outline w-full bg-gray-50 text-gray-700 rounded-md py-2 px-3 transition duration-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>

          <div className="mb-8">
            <p className="text-gray-700">
              <strong>Discounted Price (RS): </strong>
              <span className="text-green-500 font-semibold text-lg">
                {discountedPrice.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#436C68] hover:bg-[#436c68e1] text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

// good code
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
// import { FaUpload } from "react-icons/fa";
// import {
//   setPrice,
//   setDiscount,
//   calculateDiscountedPrice,
// } from "../../redux/features/shop/shopSlice";

// const ProductForm = ({
//   fieldName,
//   label,
//   type,
//   value,
//   onChange,
//   placeholder,
// }) => (
//   <div className="form-group mb-4">
//     <label className="block text-gray-700 font-semibold mb-2">{label}</label>
//     <input
//       type={type}
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//     />
//   </div>
// );

// const ProductList = () => {
//   const [mainImage, setMainImage] = useState(null);
//   const [additionalImages, setAdditionalImages] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPriceState] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState(0);
//   const [discount, setDiscountState] = useState(0);
//   const [mainImageUrl, setMainImageUrl] = useState(null);
//   const [additionalImageUrls, setAdditionalImageUrls] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [createProduct] = useCreateProductMutation();
//   const { data: categories } = useFetchCategoriesQuery();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const productData = new FormData();
//       productData.append("mainImage", mainImage);
//       additionalImages.forEach((image, index) => {
//         productData.append(`additionalImages`, image);
//       });
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("category", category);
//       productData.append("brand", brand);
//       productData.append("countInStock", stock);
//       productData.append("discount", discount);

//       const { data } = await createProduct(productData);

//       if (data.error) {
//         toast.error("Product creation failed. Try Again.");
//       } else {
//         toast.success(`${data.name} is created`);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error("Product creation failed. Try Again.");
//     }
//   };

//   const uploadFileHandler = async (e, isMain = true) => {
//     const formData = new FormData();
//     if (isMain) {
//       formData.append("mainImage", e.target.files[0]);
//     } else {
//       for (let i = 0; i < e.target.files.length; i++) {
//         formData.append("additionalImages", e.target.files[i]);
//       }
//     }

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       if (isMain) {
//         setMainImage(res.mainImage);
//         setMainImageUrl(res.mainImage);
//       } else {
//         setAdditionalImages((prev) => [...prev, ...res.additionalImages]);
//         setAdditionalImageUrls((prev) => [...prev, ...res.additionalImages]);
//       }
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   const handlePriceChange = (e) => {
//     const price = e.target.value;
//     setPriceState(price);
//     dispatch(setPrice(price));
//     dispatch(calculateDiscountedPrice());
//   };

//   const handleDiscountChange = (e) => {
//     const discount = e.target.value;
//     setDiscountState(discount);
//     dispatch(setDiscount(discount));
//     dispatch(calculateDiscountedPrice());
//   };

//   const discountedPrice = price - (price * discount) / 100;

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="px-6 py-8">
//           <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
//             Create Product
//           </h1>

//           {mainImageUrl && (
//             <div className="text-center mb-8">
//               <img
//                 src={`http://localhost:5000${mainImageUrl}`}
//                 alt="main product"
//                 className="mx-auto max-h-48 rounded-md shadow-md"
//               />
//             </div>
//           )}

//           <div className="mb-8">
//             <label className="block text-gray-700 font-medium mb-2">
//               <span className="sr-only">Choose main product image</span>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
//                     <p className="text-sm text-gray-500 text-center">
//                       <span className="font-semibold">
//                         Click to upload main image
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </div>
//                   <input
//                     id="mainImage"
//                     name="mainImage"
//                     type="file"
//                     className="hidden"
//                     onChange={(e) => uploadFileHandler(e, true)}
//                   />
//                 </label>
//               </div>
//             </label>
//           </div>

//           <div className="mb-8">
//             <label className="block text-gray-700 font-medium mb-2">
//               <span className="sr-only">Choose additional product images</span>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FaUpload className="w-10 h-10 text-[#436C68] mb-3" />
//                     <p className="text-sm text-gray-500 text-center">
//                       <span className="font-semibold">
//                         Click to upload additional images (up to 4)
//                       </span>
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2">
//                       PNG, JPG, GIF up to 10MB each
//                     </p>
//                   </div>
//                   <input
//                     id="additionalImages"
//                     name="additionalImages"
//                     type="file"
//                     className="hidden"
//                     multiple
//                     onChange={(e) => uploadFileHandler(e, false)}
//                   />
//                 </label>
//               </div>
//             </label>
//           </div>

//           {additionalImageUrls.length > 0 && (
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//               {additionalImageUrls.map((url, index) => (
//                 <img
//                   key={index}
//                   src={`http://localhost:5000${url}`}
//                   alt={`additional product ${index + 1}`}
//                   className="w-full h-32 object-cover rounded-md shadow-md"
//                 />
//               ))}
//             </div>
//           )}

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//             <ProductForm
//               fieldName="name"
//               placeholder="Product name"
//               label="Name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <ProductForm
//               fieldName="price"
//               placeholder="Product price"
//               label="Price (RS)"
//               type="number"
//               value={price}
//               onChange={handlePriceChange}
//             />
//             <ProductForm
//               fieldName="brand"
//               placeholder="Product brand"
//               label="Brand"
//               type="text"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//             />
//             <ProductForm
//               fieldName="stock"
//               label="Count In Stock"
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//             />
//             <ProductForm
//               fieldName="discount"
//               label="Discount (%)"
//               type="number"
//               value={discount}
//               onChange={handleDiscountChange}
//             />
//             <div className="form-group">
//               <label
//                 htmlFor="category"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Category
//               </label>
//               <select
//                 id="category"
//                 className="shadow appearance-none border text-gray-700 leading-tight focus:shadow-outline w-full bg-gray-50 rounded-md py-2 px-3 focus:outline-none transition duration-200"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select a category</option>
//                 {categories?.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c?.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="mb-8">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               placeholder="Product description..."
//               className="shadow appearance-none border leading-tight focus:outline-none focus:shadow-outline w-full bg-gray-50 text-gray-700 rounded-md py-2 px-3 transition duration-200"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="4"
//             ></textarea>
//           </div>

//           <div className="mb-8">
//             <p className="text-gray-700">
//               <strong>Discounted Price (RS): </strong>
//               <span className="text-green-500 font-semibold text-lg">
//                 {discountedPrice.toFixed(2)}
//               </span>
//             </p>
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#436C68] hover:bg-[#436c68e1] text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 shadow-lg hover:shadow-xl"
//           >
//             Add Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
