import { RequestHandler, ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import cards from "../models/cards";
import users from "../models/users";

export const doesUserExistForGet: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Тип _id не соответствует ObjectId",
    );

  const user = await users.findById(userId);

  if (!user)
    throw createError(
      StatusCodes.NOT_FOUND,
      "Пользователь по указанному _id не найден",
    );

  next();
};

export const doesUserExistForPatch: RequestHandler = async (req, res, next) => {
  const user = await users.findById(req.user._id);

  if (!user)
    throw createError(
      StatusCodes.NOT_FOUND,
      "Пользователь по указанному _id не найден",
    );

  next();
};

export const doesCardExist: RequestHandler = async (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId))
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Тип _id не соответствует ObjectId",
    );

  const card = await cards.findById(cardId);

  if (!card) {
    throw createError(
      StatusCodes.NOT_FOUND,
      "Карточка с указанным _id не найдена",
    );
  }

  next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: "Произошла ошибка" });
};
