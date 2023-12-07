import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("not found");
      return user;
    }
    return user;
  } catch (error) {
    console.log("loi");
  }
};
