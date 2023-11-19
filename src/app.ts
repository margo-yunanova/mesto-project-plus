import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import { celebrate, Joi, errors } from "celebrate";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { errorHandler } from "./middleware/middleware";
import { login } from "./controllers/login";
import { createUser } from "./controllers/users";
import { auth } from "./middleware/auth";
import { requestLogger, errorLogger } from "./middleware/logger";
import users from "./models/users";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/mesto");

app.use(requestLogger);

app.use(express.json());

app.use(
  cors({
    origin: "http://mesto.margo.nomoredomainsmonster.ru",
    optionsSuccessStatus: 200,
  }),
);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).default("Жак-Ив Кусто"),
      about: Joi.string().min(2).max(200).default("Исследователь"),
      avatar: Joi.string()
        .uri()
        .default(
          "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
        ),
    }),
  }),
  createUser,
);

app.use(auth);
app.use("/", cardsRouter);
app.use("/", userRouter);

app.use(errorLogger);
app.use(errors());
app.use("/", errorHandler);

const main = async () => {
  await users.init();
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main();
