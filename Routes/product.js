import express from "express";
import {
  addProduct,
  deleteById,
  getAllProduct,
  getProductById,
  getProductByUserId,
  home,
  updateProductByID,
} from "../Controllers/product.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// add product
router.post("/add", isAuthenticated, addProduct);

// getAllProducts product
router.get("/getAllProduct", getAllProduct);

// get product by user id
router.get("/user", isAuthenticated, getProductByUserId);

// get product by id
router.get("/:id", getProductById);

// update product by id
router.put("/update/:id", isAuthenticated, updateProductByID);

// delete product by id
router.delete("/delete/:id", isAuthenticated, deleteById);

// Home
router.get("/home", home);

export default router;
