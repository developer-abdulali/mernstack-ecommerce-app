import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// const addProduct = asyncHandler(async (req, res) => {
//   try {
//     const { name, description, price, category, brand, discount } = req.fields;

//     // Validation
//     switch (true) {
//       case !name:
//         return res.json({ error: "Name is required" });
//       case !brand:
//         return res.json({ error: "Brand is required" });
//       case !description:
//         return res.json({ error: "Description is required" });
//       case !price:
//         return res.json({ error: "Price is required" });
//       case !category:
//         return res.json({ error: "Category is required" });
//       case discount < 0 || discount > 100:
//         return res.json({ error: "Discount must be between 0 and 100" });
//     }

//     const product = new Product({ ...req.fields, discount });

//     await product.save();
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error.message);
//   }
// });

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category: categoryName,
      brand,
      countInStock,
      discount,
    } = req.body;

    // Find category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    const mainImage = req.files["mainImage"]
      ? req.files["mainImage"][0].path
      : null;
    const additionalImages = req.files["additionalImages"]
      ? req.files["additionalImages"].map((file) => file.path)
      : [];

    const product = new Product({
      name,
      description,
      price,
      category: category._id,
      brand,
      countInStock,
      discount,
      image: mainImage,
      additionalImages,
    });

    const createdProduct = await product.save();

    // // Delete uploaded files from the uploads folder
    // const removeFiles = (files) => {
    //   files.forEach((file) => {
    //     fs.unlink(file, (err) => {
    //       if (err) console.error(`Error deleting file ${file}: ${err.message}`);
    //     });
    //   });
    // };

    // // Remove main image and additional images
    // if (mainImage) removeFiles([mainImage]);
    // if (additionalImages.length > 0) removeFiles(additionalImages);

    res.status(201).json({
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Product creation failed", error: error.message });
  }
};

/// good working code
// const createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category: categoryName, // Expecting category as a name
//       brand,
//       countInStock,
//       discount,
//     } = req.body;

//     // Log the received categoryName for debugging
//     console.log("Received categoryName:", categoryName);

//     // Find category by name
//     const category = await Category.findOne({ name: categoryName });

//     if (!category) {
//       return res.status(400).json({ message: "Category does not exist" });
//     }

//     const mainImage = req.files["mainImage"]
//       ? req.files["mainImage"][0].path
//       : null;
//     const additionalImages = req.files["additionalImages"]
//       ? req.files["additionalImages"].map((file) => file.path)
//       : [];

//     const product = new Product({
//       name,
//       description,
//       price,
//       category: category._id, // Use the ObjectId of the found category
//       brand,
//       countInStock,
//       discount,
//       image: mainImage,
//       additionalImages,
//     });

//     const createdProduct = await product.save();

//     res.status(201).json({
//       message: "Product created successfully",
//       product: createdProduct,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Product creation failed", error: error.message });
//   }
// };

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      // .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// 1st original code
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  createProduct,
  // addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
