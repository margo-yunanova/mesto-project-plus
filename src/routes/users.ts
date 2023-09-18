import { Router } from "express";
import {
  updateAvatarURL,
  updateProfileURL,
  userURL,
  usersURL,
} from "../constants/routes";
import {
  doesUserExistForGet,
  doesUserExistForPatch,
} from "../middleware/middleware";
import {
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
} from "../controllers/users";

const router = Router();
router.patch([updateProfileURL, updateAvatarURL], doesUserExistForPatch);

// GET /users — возвращает всех пользователей
router.get(usersURL, getUsers);

// GET /users/:userId - возвращает пользователя по _id
router.get(userURL, doesUserExistForGet);
router.get(userURL, getUser);

// PATCH /users/me — обновляет профиль
router.patch(updateProfileURL, updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch(updateAvatarURL, updateAvatar);

export default router;
