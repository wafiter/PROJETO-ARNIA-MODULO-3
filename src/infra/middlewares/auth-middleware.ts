import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class AuthMiddleware {
  static handler(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    if (!headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = headers?.authorization.replace("Bearer ", "");

    try {
      jwt.verify(token, process.env.SECRET_KEY as string);

      const payload = jwt.decode(token) as any;

      if (!payload) {
        throw new Error("user not found");
      }

      req.params.id = payload.id;
    } catch (error) {
      return res.status(401).json({ message: "invalid token" });
    }

    next();
  }
}
