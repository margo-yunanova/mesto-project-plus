import mongoose from "mongoose";
import validator from "validator";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: "Некорректный Email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator(url: string) {
        return validator.isURL(url);
      },
      message: "Некорректный URL",
    },
    required: false,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

export default mongoose.model<IUser>("user", userSchema);
