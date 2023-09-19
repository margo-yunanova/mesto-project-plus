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

router.get(usersURL, getUsers);

router.get(profileURL, getUser);

router.get(userURL, doesUserExistForGet, getUserById);

router.patch([profileURL, updateAvatarURL], doesUserExistForPatch);

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
