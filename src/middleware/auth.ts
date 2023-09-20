import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { secretToken } from "../constants/constants";

export const auth: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createError(StatusCodes.UNAUTHORIZED, "Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");

  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(token, secretToken) as jwt.JwtPayload;
  } catch {
    throw createError(StatusCodes.UNAUTHORIZED, "'Необходима авторизация'");
  }

  req.user = { _id: payload._id };
  next();
};
