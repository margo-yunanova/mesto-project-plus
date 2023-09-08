import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import cardsRouter from "./routes/cards";

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect("mongodb://localhost:27017/mesto");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", cardsRouter);
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
