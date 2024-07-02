import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await User.find({ email });
  if (checkUser.length > 0) {
    return res.status(401).json({ message: "user already register" });
  }
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPass });
  res
    .status(200)
    .json({ message: "User register successfully", success: true, user });
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(401).json({ message: "user not found" });
  }

  if (!password) {
    return res.status(401).json({ message: "password incorrect blank" });
  }
  const validPAss = await bcrypt.compare(password, checkUser.password);
  if (!validPAss) {
    return res.status(401).json({ message: "password incorrect" });
  }
  const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SC, {
    expiresIn: "365d",
  });
  res.status(200).json({ message: "successfully login", checkUser, token });
};
