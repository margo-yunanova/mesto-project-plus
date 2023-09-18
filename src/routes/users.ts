import { Router } from "express";
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
router.get(userURL, getUserById);

// GET /users/me — получить профиль
router.get(profileURL, getUser);
// PATCH /users/me — обновляет профиль
router.patch(profileURL, updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch(updateAvatarURL, updateAvatar);

export default router;
