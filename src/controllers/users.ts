import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import users from "../models/users";

export const getUsers: RequestHandler = async (req, res) => {
  const usersDb = await users.find();
  res.send([...usersDb]);
};

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

export const createUser: RequestHandler = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  const hashPassword = await bcryptjs.hash(password, 10);
  try {
    const user = await users.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
    res.send(user);
  } catch {
    next(
      createError(
        StatusCodes.CONFLICT,
        "Пользователь с указанным email уже существует",
      ),
    );
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  const { name, about } = req.body;
  const user = await users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { returnDocument: "after" },
  );
  res.send(user);
};

export const updateAvatar: RequestHandler = async (req, res) => {
  const { avatar } = req.body;

  const user = await users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { returnDocument: "after" },
  );
  res.send(user);
};
