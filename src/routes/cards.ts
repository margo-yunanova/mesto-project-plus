import { Router } from "express";
import { celebrate, Joi } from "celebrate";
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

router.post(
  cardsURL,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri().required(),
    }),
  }),
  createCard,
);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete(
  cardURL,
  doesCardExist,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required(),
    }),
  }),
  deleteCard,
);

router.all([likeCardURL, legacyLikeCardURL], doesCardExist);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put(
  [likeCardURL, legacyLikeCardURL],
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required(),
    }),
  }),
  putLike,
);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete(
  [likeCardURL, legacyLikeCardURL],
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required(),
    }),
  }),
  deleteLike,
);

export default router;
