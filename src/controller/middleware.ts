import { RequestHandler } from "express";

const jwt = require("jsonwebtoken");

export const auth: RequestHandler = (req: any, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ message: "Please, Go To Register Page" });

  try {
    const varifield = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = varifield;
    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
