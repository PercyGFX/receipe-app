import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";

export function jwtauthenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
   
    if (decodedToken) next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" }); // Invalid token
  }
}
