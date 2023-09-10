import { Router } from "express";
import {
  updateAvatarURL,
  updateProfileURL,
  userURL,
  usersURL,
} from "../constants/routes";
import { doesUserExist } from "../middleware/middleware";
import {
  createUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from "../controllers/users";

const router = Router();
router.all([userURL, updateProfileURL, updateAvatarURL], doesUserExist);

// GET /users — возвращает всех пользователей
router.get(usersURL, getUsers);

// POST /users — создаёт пользователя
router.post(usersURL, createUser);

// GET /users/:userId - возвращает пользователя по _id
router.get(userURL, getUser);

// PATCH /users/me — обновляет профиль
router.patch(updateProfileURL, updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch(updateAvatarURL, updateAvatar);

export default router;
