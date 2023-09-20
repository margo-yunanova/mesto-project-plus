import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/users";
import { secretToken } from "../constants/constants";

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email }).select("+password");

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

  const token = jwt.sign({ _id: user._id }, secretToken, { expiresIn: "7d" });

  // TODO записать JWT в httpOnly куку
  res.cookie("token", `Bearer ${token}`).send();
};
