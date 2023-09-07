import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import cards from "../db/cards";
import {
  cardsURL,
  cardURL,
  legacyLikeCardURL,
  likeCardURL,
} from "../constants/routes";
import { doesCardExist } from "../middleware/middleware";
import users from "../db/users";

const router = Router();

// GET /cards — возвращает все карточки

router.get(cardsURL, (req, res) => {
  res.send({ message: "Карточки переданы", cards });
});

// POST /cards — создаёт карточку

router.post(cardsURL, (req, res) => {
  const { name, link } = req.body;

  if (typeof name !== "string" || typeof link !== "string" || !name || !link) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Переданы некорректные данные при создании карточки" });
    return;
  }

  cards.push({ name, link, createdAt: new Date().toUTCString() });

  res.send({
    message: "Карточки создана",
    name: cards.at(-1)?.name,
    link: cards.at(-1)?.link,
  });
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete(cardURL, doesCardExist);
router.delete(cardURL, (req, res) => {
  const { cardId } = req.params;

  const index = cards.findIndex(({ _id }) => _id === cardId);

  cards.splice(index, 1);
  res.send({ message: "Карточка удалена" });
});

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put([likeCardURL, legacyLikeCardURL], doesCardExist);
router.put([likeCardURL, legacyLikeCardURL], (req, res) => {
  const { cardId } = req.params;

  // TODO fake userID
  const fakeUserId = "071892f7dd14d4795abaa4d4";

  const cardLikes = cards.find(({ _id }) => cardId === _id)?.likes!;
  const isLikedCard = cardLikes.some(
    ({ _id }) => fakeUserId.toString() === _id,
  );
  if (isLikedCard) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Карточка уже лайкнута" });
    return;
  }
  const user = users.find(({ _id }) => fakeUserId === _id)!;
  cardLikes.push(user);
  res.send({ message: "Лайк поставлен" });
});

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete([likeCardURL, legacyLikeCardURL], doesCardExist);
router.delete([likeCardURL, legacyLikeCardURL], (req, res) => {
  const { cardId } = req.params;

  const fakeUserId = "071892f7dd14d4795abaa4d4";

  const cardLikes = cards.find(({ _id }) => cardId === _id)?.likes!;

  const isLikedCard = cardLikes.some(
    ({ _id }) => fakeUserId.toString() === _id,
  );
  if (!isLikedCard) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Лайка нет" });
    return;
  }
  const userIndex = cardLikes.findIndex(({ _id }) => fakeUserId === _id)!;
  cardLikes.splice(userIndex, 1);
  res.send({ message: "Лайк удалён", isLikedCard, cardLikes });
});

export default router;
