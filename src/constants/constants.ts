import "dotenv/config";

const { JWT_SECRET } = process.env;

export const secretToken = JWT_SECRET;
