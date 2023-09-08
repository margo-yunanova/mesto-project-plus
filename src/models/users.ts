import mongoose from "mongoose";

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    validate: {
      validator(v: String) {
        return v.toLowerCase().startsWith("http");
      },
      message: "Некорректный URL",
    },
    required: true,
  },
});

export default mongoose.model<IUser>("user", userSchema);
