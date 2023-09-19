import winston from "winston";
import expressWinston from "express-winston";

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "log/request.log",
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "log/error.log" })],
  format: winston.format.json(),
});
