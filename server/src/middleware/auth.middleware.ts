import * as JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../request-definitions";

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | void => {
  try {
    const token = req.cookies?.["accessToken"];
    if (!token) {
      res.status(400).json("Login first.");
    }
      const decoded: any = JWT.verify(token, String(process.env.ACCESS_SECRET));
      const id: string = decoded.id;
      req.userId = id;
      next();
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export default isAuthenticated;
