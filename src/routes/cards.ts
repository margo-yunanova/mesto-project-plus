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

router.get(cardsURL, getCards);

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

router.delete(cardURL, doesCardExist, deleteCard);

router.all([likeCardURL, legacyLikeCardURL], doesCardExist);

router.put([likeCardURL, legacyLikeCardURL], putLike);

router.delete([likeCardURL, legacyLikeCardURL], deleteLike);

export default router;
