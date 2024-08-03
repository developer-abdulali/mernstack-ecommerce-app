// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     } else if (req.file) {
//       res.status(200).send({
//         message: "Image uploaded successfully",
//         image: `/${req.file.path}`,
//       });
//     } else {
//       res.status(400).send({ message: "No image file provided" });
//     }
//   });
// });

// export default router;

// 3rd code
import path from "path";
import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler"; // If you use asyncHandler

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadMultipleImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 4 },
]);

router.post(
  "/",
  uploadMultipleImages,
  asyncHandler(async (req, res) => {
    try {
      console.log("Files received:", req.files);

      const mainImage = req.files["mainImage"]
        ? req.files["mainImage"][0].path
        : null;
      const additionalImages = req.files["additionalImages"]
        ? req.files["additionalImages"].map((file) => file.path)
        : [];

      console.log("Main Image Path:", mainImage);
      console.log("Additional Images Paths:", additionalImages);

      if (!mainImage && additionalImages.length === 0) {
        return res.status(400).send({ message: "No image files provided" });
      }

      const { name, description, price, category, brand, discount } = req.body;

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
        case discount < 0 || discount > 100:
          return res.json({ error: "Discount must be between 0 and 100" });
      }

      const product = new Product({
        name,
        description,
        price,
        category,
        brand,
        discount,
        image: mainImage, // Set main image
        additionalImages, // Set additional images
      });

      await product.save();
      res.status(200).send({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  })
);

export default router;

// 2nd codde
// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// const uploadMultipleImages = upload.fields([
//   { name: "mainImage", maxCount: 1 },
//   { name: "additionalImages", maxCount: 4 },
// ]);

// // 2nd code
// router.post("/", (req, res) => {
//   uploadMultipleImages(req, res, (err) => {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     console.log("Files received:", req.files);

//     const mainImage = req.files["mainImage"]
//       ? req.files["mainImage"][0].path
//       : null;
//     const additionalImages = req.files["additionalImages"]
//       ? req.files["additionalImages"].map((file) => file.path)
//       : [];

//     console.log("Files received:", req.files);
//     console.log("Main Image Path:", mainImage);
//     console.log("Additional Images Paths:", additionalImages);

//     if (!mainImage && additionalImages.length === 0) {
//       return res.status(400).send({ message: "No image files provided" });
//     }

//     res.status(200).send({
//       message: "Images uploaded successfully",
//       mainImage: mainImage ? `${mainImage}` : null,
//       additionalImages: additionalImages.map((img) => `${img}`),
//     });
//   });
// });

// 1st code
// router.post("/", (req, res) => {
//   uploadMultipleImages(req, res, (err) => {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     console.log("Files received:", req.files);

//     const mainImage = req.files["mainImage"]
//       ? req.files["mainImage"][0].path
//       : null;
//     const additionalImages = req.files["additionalImages"]
//       ? req.files["additionalImages"].map((file) => file.path)
//       : [];

//     console.log("Main Image Path:", mainImage);
//     console.log("Additional Images Paths:", additionalImages);

//     if (!mainImage && additionalImages.length === 0) {
//       return res.status(400).send({ message: "No image files provided" });
//     }

//     res.status(200).send({
//       message: "Images uploaded successfully",
//       mainImage: mainImage ? `${mainImage}` : null,
//       additionalImages: additionalImages.map((img) => `${img}`),
//     });
//   });
// });

// running code
// import path from "path";
// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// const uploadMultipleImages = upload.fields([
//   { name: "mainImage", maxCount: 1 },
//   { name: "additionalImages", maxCount: 4 },
// ]);

// router.post("/", (req, res) => {
//   uploadMultipleImages(req, res, (err) => {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     console.log("Files received:", req.files);

//     const mainImage = req.files["mainImage"]
//       ? req.files["mainImage"][0].path
//       : null;
//     const additionalImages = req.files["additionalImages"]
//       ? req.files["additionalImages"].map((file) => file.path)
//       : [];

//     console.log("Main Image Path:", mainImage);
//     console.log("Additional Images Paths:", additionalImages);

//     if (!mainImage && additionalImages.length === 0) {
//       return res.status(400).send({ message: "No image files provided" });
//     }

//     res.status(200).send({
//       message: "Images uploaded successfully",
//       mainImage: mainImage ? `${mainImage}` : null,
//       additionalImages: additionalImages.map((img) => `${img}`),
//     });
//   });
// });

// export default router;
