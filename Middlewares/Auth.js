import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    return res.json({ message: "login first", success: false });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SC);
    const userId = decode.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ message: "User not exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
