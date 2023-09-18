import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/users";

// TODO мидлваря существует ли юзер
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при авторизации",
    );
  }

  const user = await users.findOne({ email });

  if (!user)
    throw createError(
      StatusCodes.UNAUTHORIZED,
      "Переданы некорректные данные при авторизации",
    );

  const isPasswordMatched = await bcryptjs.compare(password, user.password);

  if (!isPasswordMatched)
    throw createError(
      StatusCodes.UNAUTHORIZED,
      "Переданы некорректные данные при авторизации",
    );

  const token = jwt.sign({ _id: user._id }, "aethun0I", { expiresIn: "7d" }); // 1000 * 60 * 60 * 24 * 7

  // TODO записать JWT в httpOnly куку

  res.send({ token });
};
