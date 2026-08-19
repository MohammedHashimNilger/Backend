import { User } from "../models/User.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

/**
 * Lenient authentication middleware.
 * Attaches `req.user` if a valid access token is present,
 * but does NOT throw if the token is missing, expired, or invalid.
 * Use this for endpoints like logout where we always want to proceed.
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Token is invalid/expired — that's fine, just proceed without req.user
  }

  next();
});
