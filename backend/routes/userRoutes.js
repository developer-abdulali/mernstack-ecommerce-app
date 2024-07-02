import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logoutUser,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authrizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authrizeAdmin, getAllUsers);

router.route("/auth").post(loginUser);
router.route("/logout").post(logoutUser);

// admin routes
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router
  .route("/:id")
  .delete(authenticate, authrizeAdmin, deleteUserById)
  .get(authenticate, authrizeAdmin, getUserById)
  .put(authenticate, authrizeAdmin, updateUserById);

export default router;
