import type { NextFunction, Request, Response } from "express";
import { verifyJwt } from "./config/jwt";
import type { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid",
    });
    return;
  }

  const token = auth.toLowerCase().startsWith("bearer ") ? auth.split(" ")[1] : auth;

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid",
    });
    return;
  }

  try {
    const { userId } = verifyJwt(token) as JwtPayload;
    req.userId = userId;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid",
    });
  }
};
