import express, { Router, Request, Response } from "express";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { userURL } from "./constants/routes";

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", cardsRouter);
app.use(userURL, userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
