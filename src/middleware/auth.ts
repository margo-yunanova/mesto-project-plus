import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const auth: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createError(StatusCodes.UNAUTHORIZED, "Необходима авторизация");
  }

  const token = authorization.replace("Bearer ", "");

  let payload: string | jwt.JwtPayload;
  try {
    payload = jwt.verify(token, "aethun0I");
  } catch {
    throw createError(StatusCodes.UNAUTHORIZED, "'Необходима авторизация'");
  }

  req.user = payload;
  next();
};
