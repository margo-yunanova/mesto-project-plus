import { Request, Response, Router } from "express";
import cards from "../db/cards";
import { cardsURL, cardURL, likeCardURL } from "../constants/routes";

const router = Router();

// GET /cards — возвращает все карточки

router.get(cardsURL, (req: Request, res: Response) => {
  res.send(cards);
});

// POST /cards — создаёт карточку

router.post(cardsURL, (req: Request, res: Response) => {
  const { name, link } = req.body;
  cards.push({ name, link, createdAt: new Date().toUTCString() });
  res.send(cards.at(-1));
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору

router.delete(cardURL, (req: Request, res: Response) => {
  const { cardId } = req.params;

  const index = cards.findIndex((card) => card._id === cardId);
  res.send(cards.splice(index, 1));
});

// PUT /cards/:cardId/likes — поставить лайк карточке

router.put(likeCardURL, (req: Request, res: Response) => {
  const { likes } = req.params;
});

// DELETE /cards/:cardId/likes — убрать лайк с карточки

router.delete(likeCardURL, (req: Request, res: Response) => {
  const { likes } = req.params;
});

export default router;
