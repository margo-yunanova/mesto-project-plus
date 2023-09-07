import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import users from "../db/users";
import {
  updateAvatarURL,
  updateProfileURL,
  userURL,
  usersURL,
} from "../constants/routes";
import { doesUserExist } from "../middleware/middleware";

const router = Router();

// GET /users — возвращает всех пользователей
router.get(usersURL, (req, res) => {
  res.send({
    message: "Данные пользователей переданы",
    users,
  });
});

// GET /users/:userId - возвращает пользователя по _id
router.get(userURL, (req, res) => {
  const { userId } = req.params;
  const user = users.find(({ _id }) => userId === _id)!;

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send({
      message: "Пользователь по указанному _id не найден",
    });
    return;
  }

  res.send({
    message: "Данные пользователя переданы",
    user,
  });
});

// POST /users — создаёт пользователя
router.post(usersURL, (req, res) => {
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

  users.push({ _id: Date.now().toString(), name, about, avatar, cohort: "18" });

  res.send({
    message: "Профиль обновлен",
    ...users.at(-1), // TODO возвращается id, cohort
  });
});

// PATCH /users/me — обновляет профиль
router.patch(updateProfileURL, doesUserExist);
router.patch(updateProfileURL, (req, res) => {
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

  const fakeUserId = "42";
  const user = users.find(({ _id }) => _id === fakeUserId)!;

  user.name = name;
  user.about = about;

  res.send({
    message: "Профиль обновлен",
    user,
  });
});

// PATCH /users/me/avatar — обновляет аватар
router.patch(updateAvatarURL, doesUserExist);
router.patch(updateAvatarURL, (req, res) => {
  const { avatar } = req.body;
  if (typeof avatar !== "string" || !avatar) {
    res.status(StatusCodes.BAD_REQUEST).send({
      message: "Переданы некорректные данные при обновлении аватара",
    });
    return;
  }
  const fakeUserId = "42";
  const user = users.find(({ _id }) => _id === fakeUserId)!;

  user.avatar = req.body.avatar;
  res.send({
    message: "Аватар обновлен",
    user,
  });
});

export default router;
