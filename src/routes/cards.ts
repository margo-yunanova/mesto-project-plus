import { Router } from "express";
import { doesCardExist } from "../middleware/middleware";
import {
  cardsURL,
  cardURL,
  legacyLikeCardURL,
  likeCardURL,
} from "../constants/routes";
import {
  createCard,
  deleteCard,
  deleteLike,
  getCards,
  putLike,
} from "../controllers/cards";

const router = Router();

// GET /cards — возвращает все карточки

router.get(cardsURL, getCards);

// POST /cards — создаёт карточку

router.post(cardsURL, createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete(cardURL, doesCardExist, deleteCard);

router.all([likeCardURL, legacyLikeCardURL], doesCardExist);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put([likeCardURL, legacyLikeCardURL], putLike);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete([likeCardURL, legacyLikeCardURL], deleteLike);

export default router;
