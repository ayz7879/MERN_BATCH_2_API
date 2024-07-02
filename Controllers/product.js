import { Products } from "../Models/Products.js";

// add product
export const addProduct = async (req, res) => {
  const { title, description, price, qty, imgSrc, category } = req.body;
  try {
    const data = await Products.create({
      title,
      description,
      price,
      qty,
      imgSrc,
      category,
      userId: req.user,
    });
    res.json({
      message: "Your Product has been added",
      success: true,
      data,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const data = await Products.find().sort({ createdAt: -1 });
    res.json({
      message: "Your data has been successfully Get",
      success: true,
      data,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Products.findById(id);
    if (!product) {
      return res.json({ message: "invalid id" });
    }
    res.json({ message: "Product by id...", product });
  } catch (error) {
    res.json({ message: "Invalid ID" });
  }
};

// update product by id
export const updateProductByID = async (req, res) => {
  const id = req.params.id;
  try {
    const updateData = req.body;
    const product = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json({ message: "Product Updated", product });
  } catch (error) {
    res.json({ message: "invalid id update" });
  }
};

// delete product by id
export const deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndDelete(id);
    res.json({ message: "Product Deleted", product });
  } catch (error) {
    res.json({ message: "invalid delete id" });
  }
};

// get product by user id
export const getProductByUserId = async (req, res) => {
  const id = req.user._id;
  try {
    let product = await Products.find({ userId: id });
    if (!product) {
      return res.json({ message: "invalid User id", success: false });
    }
    res.json({ message: "Product by User id...", product, success: true });
  } catch (error) {
    res.json({ message: "Invalid ID" });
  }
};

// home
export const home = async (req, res) => {
  res.json({ message: "This is home" });
};
