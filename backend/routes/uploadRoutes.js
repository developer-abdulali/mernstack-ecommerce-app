import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 4 },
  ]),
  createProduct
);

// Add a test route to check if this router works
router.get("/test", (req, res) => {
  res.send("Upload route is working");
});

export default router;
