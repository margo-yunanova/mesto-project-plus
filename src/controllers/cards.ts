import { RequestHandler } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import cards from "../models/cards";

/* по тз бэкенда ничего не описано
  по тз фронтенда возвращался массив с объектами
  [
    {
        "likes": [
            {
                "name": "test",
                "about": "test",
                "avatar": "https://pixelbox.ru/wp-content/uploads/2021/03/ava-instagram-4.jpg",
                "_id": "630aea78c054d81d36f21a6c",
                "cohort": "plus-cohort-16"
            }
        ],
        "_id": "646b91d59d5043064ebc208d",
        "name": "Smoke",
        "link": "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        "owner": {
            "name": "Жак",
            "about": "test",
            "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
            "_id": "ef27e49fb021c3c5a56db61b",
            "cohort": "plus-cohort-16"
        },
        "createdAt": "2023-05-22T16:01:25.571Z"
    },
  ]
*/

export const getCards: RequestHandler = async (req, res) => {
  const cardsDb = await cards.find().populate(["owner", "likes"]);
  res.send({ cardsDb });
};

/* по тз бэкенда возвращать нужно name и link
  по тз фронтенда возвращался объект с новой карточкой
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },
*/

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

/* в тз бэкенда ничего об ответе нет,
  в тз фронтенда возвращается обновлённый json с карточкой
  с обновленным массивом лайков
*/
export const putLike: RequestHandler = async (req, res) => {
  const { cardId } = req.params;

  const card = await cards
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .populate(["owner", "likes"]);

  res.send({ card, message: "Лайк поставлен" });
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

  res.send({ card, message: "Лайк удалён" });
};
