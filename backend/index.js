import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req, res) => {
  res.send(`Server listening on ${port}`);
});

app.listen(port, () => console.log(`Server listening on ${port}`));
