import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import  jwt  from "jsonwebtoken";
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers("authorization")?.replace("Bearer ", "");
    if (!token) {
      throw ApiError.unauthorized("Access token is required");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw ApiError.unauthorized("User not found/invalid acces token");
    }
  
    req.user = user;
    next();
  } catch (error) {
    throw ApiError.unauthorized("Invalid access token");
    
  }
});
