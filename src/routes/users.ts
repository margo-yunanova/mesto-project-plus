import { Request, Response, Router } from "express";
import users from "../db/users";
import { updateAvatarURL, updateProfileURL } from "../constants/routes";
import doesUserExist from "../middleware/middleware";

const router = Router();

// PATCH /users/me — обновляет профиль
router.patch(updateProfileURL, doesUserExist);
router.patch(updateProfileURL, (req: Request, res: Response) => {
  const userIndex = users.findIndex(({ id }) => id === +req.body._id);

  users[userIndex].name = req.body.name;
  users[userIndex].about = req.body.about;
  res.send({
    message: "Профиль обновлен",
    user: users[userIndex],
  });
});

// PATCH /users/me/avatar — обновляет аватар
router.patch(updateAvatarURL, doesUserExist);
router.patch(updateAvatarURL, (req: Request, res: Response) => {
  const userIndex = users.findIndex(({ id }) => id === +req.body._id);

  users[userIndex].avatar = req.body.avatar;
  res.send({
    message: "Аватар обновлен",
    user: users[userIndex],
  });
});

export default router;
