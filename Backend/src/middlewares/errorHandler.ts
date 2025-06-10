import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  console.error(`🚨 PATH: ${req.path}`);
  console.error(error);

  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};

export default errorHandler;
