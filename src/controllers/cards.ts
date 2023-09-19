import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import cards from "../models/cards";

export const getCards: RequestHandler = async (req, res) => {
  const cardsDb = await cards.find().populate(["owner", "likes"]);
  res.send(cardsDb);
};

export const createCard: RequestHandler = async (req, res) => {
  const { name, link } = req.body;

  const card = await cards.create({
    name,
    link,
    owner: req.user._id,
    likes: [],
    createdAt: new Date().toUTCString(),
  });
  await card.populate(["owner", "likes"]);
  res.send(card);
};

export const deleteCard: RequestHandler = async (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  const card = await cards.findOneAndDelete({ _id: cardId, owner: { _id } });

  if (!card) {
    throw createError(
      StatusCodes.BAD_REQUEST,
      "Переданы некорректные данные при удалении карточки",
    );
  }
  res.send({ message: "Пост удалён" });
};

export const putLike: RequestHandler = async (req, res) => {
  const { cardId } = req.params;

  const card = await cards
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .populate(["owner", "likes"]);

  res.send(card);
};

export const deleteLike: RequestHandler = async (req, res) => {
  const { cardId } = req.params;

  const card = await cards
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .populate(["owner", "likes"]);

  res.send(card);
};
