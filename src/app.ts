import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { errorHandler } from "./middleware/middleware";
import { fakeUserId } from "./constants/constants";
import { login } from "./controllers/login";
import { createUser } from "./controllers/users";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/mesto");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: fakeUserId,
  };

  next();
});

app.use("/", cardsRouter);
app.use("/", userRouter);
app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
