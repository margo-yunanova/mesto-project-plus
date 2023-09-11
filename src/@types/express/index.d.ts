import mongoose from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: string | mongoose.ObjectId;
      };
    }
  }
}
