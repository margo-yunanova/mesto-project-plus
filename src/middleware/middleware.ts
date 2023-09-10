import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";
import { StatusCodes } from "http-status-codes";
import cards from "../db/cards";
import users from "../models/users";

const doesUserExist: RequestHandler = async (req, res, next) => {
  const fakeUserId = "64fb89ad64b9c50cbda226df";
  const { userId } = req.params;
  try {
    await users.findById(userId || fakeUserId);
    next();
  } catch {
    res.status(StatusCodes.NOT_FOUND).send({
      message: "Пользователь по указанному _id не найден",
    });
  }
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

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
