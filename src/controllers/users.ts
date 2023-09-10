import { Request, Response, RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import users from "../models/users";

const fakeUserId = "64fdaa7d264ecd35c49ced28";

export const getUsers: RequestHandler = async (req, res) => {
  const usersDb = await users.find();
  res.send({ usersDb });
};

export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const user = await users.findById(userId);
  res.send({ user });
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
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при создании пользователя",
    );
  }

  await users.create({ name, about, avatar });
  res.send({ name, about, avatar });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;

  if (
    typeof name !== "string" ||
    typeof about !== "string" ||
    !name ||
    !about
  ) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при обновлении профиля",
    );
  }

  await users.findByIdAndUpdate(fakeUserId, { name, about });
  res.send({ name, about });
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;

  if (typeof avatar !== "string" || !avatar) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при обновлении аватара",
    );
  }

  await users.findByIdAndUpdate(fakeUserId, { avatar });
  res.send({ avatar });
};
