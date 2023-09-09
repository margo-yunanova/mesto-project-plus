import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import users from "../models/users";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const usersDb = await users.find();

    if (!usersDb) {
      res.status(StatusCodes.NOT_FOUND).send({
        message: "Пользователей в базе данных нет",
      });
      return;
    }

    res.send({ usersDb });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" });
  }
};

export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await users.findById(userId);
    res.send({ user });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" });
  }
};

// TODO проверять если пользователь?
export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  if (
    typeof name !== "string" ||
    typeof about !== "string" ||
    typeof avatar !== "string" ||
    !name ||
    !about ||
    !avatar
  ) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Переданы некорректные данные при создании пользователя",
    });
    return;
  }
  try {
    await users.create({ name, about, avatar });
    res.send({ name, about, avatar });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;

  if (
    typeof name !== "string" ||
    typeof about !== "string" ||
    !name ||
    !about
  ) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Переданы некорректные данные при обновлении профиля",
    });
    return;
  }

  const fakeUserId = "64fb89ad64b9c50cbda226df";

  try {
    await users.findByIdAndUpdate(fakeUserId, { name, about });
    res.send({ name, about });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;

  if (typeof avatar !== "string" || !avatar) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Переданы некорректные данные при обновлении аватара",
    });
    return;
  }

  const fakeUserId = "64fb89ad64b9c50cbda226df";

  try {
    await users.findByIdAndUpdate(fakeUserId, { avatar });
    res.send({ avatar });
  } catch {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Произошла ошибка" });
  }
};
