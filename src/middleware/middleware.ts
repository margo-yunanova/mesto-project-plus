import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import users from "../db/users";
import cards from "../db/cards";

const doesUserExist = (req: Request, res: Response, next: NextFunction) => {
  const fakeUserId = "42";
  const user = users.find(({ _id }) => _id === fakeUserId);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send({
      message: "Пользователь по указанному _id не найден",
    });
    return;
  }
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

export { doesUserExist, doesCardExist };
