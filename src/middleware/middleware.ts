import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";
import mongoose from "mongoose";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import cards from "../db/cards";
import users from "../models/users";
// TODO me and :userId
const doesUserExist: RequestHandler = async (req, res, next) => {
  const fakeUserId = "64fdaa7d264ecd35c49ced28";
  const fakeNotExistUserId = "64fb89ad64b9c50cbda226df";
  const { userId } = req.params;
  console.log(userId);
  // if (!mongoose.Types.ObjectId.isValid(userId))
  //   throw createError(
  //     StatusCodes.BAD_REQUEST,
  //     "Тип _id не соответствует ObjectId",
  //   );

  const user = await users.findById(userId || fakeUserId);

  if (!user)
    throw createError(
      StatusCodes.NOT_FOUND,
      "Пользователь по указанному _id не найден",
    );

  next();
};

const doesCardExist = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const card = cards.find(({ _id }) => _id === cardId);

  if (!card) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "Карточка с указанным _id не найдена" });
    return;
  }

  next();
};

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: "Произошла ошибка" });
};

export { doesUserExist, doesCardExist, errorHandler };
