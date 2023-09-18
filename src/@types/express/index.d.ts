import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user:
        | {
            _id: string | mongoose.ObjectId;
          }
        | string
        | jwt.JwtPayload;
    }
  }
}
