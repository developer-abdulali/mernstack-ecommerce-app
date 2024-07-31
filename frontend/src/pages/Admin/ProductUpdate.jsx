// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";

// const AdminProductUpdate = () => {
//   const params = useParams();

//   const { data: productData } = useGetProductByIdQuery(params._id);

//   const [image, setImage] = useState(productData?.image || "");
//   const [name, setName] = useState(productData?.name || "");
//   const [description, setDescription] = useState(
//     productData?.description || ""
//   );
//   const [price, setPrice] = useState(productData?.price || "");
//   const [category, setCategory] = useState(productData?.category || "");
//   const [quantity, setQuantity] = useState(productData?.quantity || "");
//   const [brand, setBrand] = useState(productData?.brand || "");
//   const [stock, setStock] = useState(productData?.countInStock);

//   // hook
//   const navigate = useNavigate();

//   // Fetch categories using RTK Query
//   const { data: categories = [] } = useFetchCategoriesQuery();

//   const [uploadProductImage] = useUploadProductImageMutation();

//   // Define the update product mutation
//   const [updateProduct] = useUpdateProductMutation();

//   // Define the delete product mutation
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (productData && productData._id) {
//       setName(productData.name);
//       setDescription(productData.description);
//       setPrice(productData.price);
//       setCategory(productData.category?._id);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//     }
//   }, [productData]);

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success("Item added successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       setImage(res.image);
//     } catch (err) {
//       toast.success("Item added successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);

//       // Update product using the RTK Query mutation
//       const data = await updateProduct({ productId: params._id, formData });

//       if (data?.error) {
//         toast.error(data.error, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//       } else {
//         toast.success(`Product successfully updated`, {
//           position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//         navigate("/admin/allproductslist");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Product update failed. Try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (!answer) return;

//       const { data } = await deleteProduct(params._id);
//       toast.success(`"${data.name}" is deleted`, {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       navigate("/admin/allproductslist");
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed. Try again.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="container  xl:mx-[9rem] sm:mx-[0]">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-3/4 p-3">
//             <div className="h-12">Update / Delete Product</div>

//             {image && (
//               <div className="text-center">
//                 <img
//                   src={`http://localhost:5000${image}`}
//                   // src={image}
//                   alt="product"
//                   className="block mx-auto w-[40%] h-[40%]"
//                 />
//               </div>
//             )}

//             <div className="mb-3">
//               <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//                 {image ? image.name : "Upload image"}
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={uploadFileHandler}
//                   className="text-white"
//                 />
//               </label>
//             </div>

//             <div className="p-3">
//               <div className="flex flex-wrap">
//                 <div className="one">
//                   <label htmlFor="name">Name</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="two">
//                   <label htmlFor="name block">Price</label> <br />
//                   <input
//                     type="number"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-wrap">
//                 <div>
//                   <label htmlFor="name block">Quantity</label> <br />
//                   <input
//                     type="number"
//                     min="1"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="name block">Brand</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={brand}
//                     onChange={(e) => setBrand(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <label htmlFor="" className="my-5">
//                 Description
//               </label>
//               <textarea
//                 type="text"
//                 className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />

//               <div className="flex justify-between">
//                 <div>
//                   <label htmlFor="name block">Count In Stock</label> <br />
//                   <input
//                     type="text"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="">Category</label> <br />
//                   <select
//                     placeholder="Choose Category"
//                     className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     {categories?.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="">
//                 <button
//                   onClick={handleSubmit}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminProductUpdate;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa6";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [discount, setDiscount] = useState(productData?.quantity || "");
  // const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setDiscount(productData.discount);
      // setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });
      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
      <div className="w-full p-4">
        <h2 className="text-2xl mb-4">Update / Delete Product</h2>

        {image && (
          <div className="text-center mb-4">
            <img
              src={`http://localhost:5000${image}`}
              alt="product"
              className="mx-auto max-w-xs h-auto"
            />
          </div>
        )}
        <label className="block text-gray-700 font-medium mb-2">
          <span className="sr-only">Choose product image</span>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
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
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={uploadFileHandler}
              />
            </label>
          </div>
        </label>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Discount
              </label>
              <input
                type="number"
                min="1"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Count In Stock
              </label>
              <input
                type="number"
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="py-3 px-6 rounded-lg text-lg font-bold bg-[#436C68] text-white hover:bg-[#436c68e6]"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="py-3 px-6 rounded-lg text-lg font-bold bg-pink-600 text-white hover:bg-pink-700"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default AdminProductUpdate;
