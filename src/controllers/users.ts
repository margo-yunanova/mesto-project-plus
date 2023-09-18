import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import bcryptjs from "bcryptjs";
import users from "../models/users";

export const getUsers: RequestHandler = async (req, res) => {
  const usersDb = await users.find();
  res.send([...usersDb]);
};

/*  по тз бэкенда нет уточнений,
    по тз фронтеда возвращался объект
    {
    "name": "Marie Skłodowska Curie",
    "about": "Physicist and Chemist",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0",
} */

export const getUser: RequestHandler = async (req, res) => {
  const { _id } = req.user;
  const user = await users.findById(_id);
  res.send(user);
};

export const getUserById: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const user = await users.findById(userId);
  res.send(user);
};

export const createUser: RequestHandler = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!validator.isEmail(email) || validator.isEmpty(password)) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при создании пользователя",
    );
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const user = await users.create({
    name,
    about,
    avatar,
    email,
    password: hashPassword,
  });
  res.send(user);
};

/*  по тз бэкенда вернуть нужно только name и about,
    по тз фронтеда возвращался весь обновленный профиль пользователя
    {
    "name": "Marie Skłodowska Curie",
    "about": "Physicist and Chemist",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0",
} */

export const updateProfile: RequestHandler = async (req, res) => {
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

  await users.findByIdAndUpdate(req.user._id, { name, about });
  res.send({ name, about });
};

/*  по тз бэкенда ничего не написано,
    по тз фронтеда возвращался весь обновленный профиль пользователя
    {
    "name": "Marie Skłodowska Curie",
    "about": "Physicist and Chemist",
    "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    "_id": "e20537ed11237f86bbb20ccb",
    "cohort": "cohort0",
} */

export const updateAvatar: RequestHandler = async (req, res) => {
  const { avatar } = req.body;

  if (typeof avatar !== "string" || !avatar) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при обновлении аватара",
    );
  }

  await users.findByIdAndUpdate(req.user._id, { avatar });
  res.send({ avatar });
};
