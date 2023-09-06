import { Request, Response, NextFunction } from "express";
import users from "../db/users";

const doesUserExist = (req: Request, res: Response, next: NextFunction) => {
  const userIndex = users.findIndex(({ id }) => id === +req.body._id);
  if (userIndex < 0) {
    // TODO зачем проверять ошибку, if (err.name === 'SomeErrorName')
    res.status(404).send({
      message: "Запрашиваемый пользователь не найден",
    });
    return;
  }
  next();
};

export default doesUserExist;
