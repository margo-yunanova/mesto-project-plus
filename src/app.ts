import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { errorHandler } from "./middleware/middleware";
import { login } from "./controllers/login";
import { createUser } from "./controllers/users";
import { auth } from "./middleware/auth";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/mesto");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);
app.use("/", cardsRouter);
app.use("/", userRouter);

app.use("/", errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
