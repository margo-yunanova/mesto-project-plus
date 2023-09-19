import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  updateAvatarURL,
  profileURL,
  userURL,
  usersURL,
} from "../constants/routes";
import {
  doesUserExistForGet,
  doesUserExistForPatch,
} from "../middleware/middleware";
import {
  getUserById,
  getUsers,
  getUser,
  updateAvatar,
  updateProfile,
} from "../controllers/users";

const router = Router();
router.patch([profileURL, updateAvatarURL], doesUserExistForPatch);

// GET /users — возвращает всех пользователей
router.get(usersURL, getUsers);

// GET /users/:userId - возвращает пользователя по _id
router.get(userURL, doesUserExistForGet);
router.get(
  userURL,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  getUserById,
);

// GET /users/me — получить профиль
router.get(profileURL, getUser);
// PATCH /users/me — обновляет профиль
router.patch(
  profileURL,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(200).required(),
    }),
  }),
  updateProfile,
);

// PATCH /users/me/avatar — обновляет аватар
router.patch(
  updateAvatarURL,
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string()
          .uri()
          .default(
            "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
          ),
      })
      .required(),
  }),
  updateAvatar,
);

export default router;
