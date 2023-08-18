import * as JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../request-definitions";

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | void => {
  try {
    let token;
    const headers = String(req.headers.authentication);
    if (req.cookies?.["accessToken"] && req.cookies) {
      token = req.cookies?.["accessToken"];
      if (!token) res.status(400).json("Login first.");
      const decoded: any = JWT.verify(token, String(process.env.ACCESS_SECRET));
      console.log(decoded.user);
      req.context.userId = decoded.id;
      next();
    } else {
      res.status(400).json("Login first.");
    }
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export default isAuthenticated;
