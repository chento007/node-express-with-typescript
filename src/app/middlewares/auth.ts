import { NextFunction, Request, Response, response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHandler } from "../exceptions/ErrorHandler";
import { User } from "../models/users";

export interface IUser {
    id: string;
}

export const isAuthenicationedUser = async (req: Request, res: Response, next: NextFunction) => {

    let token: string = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        const response = new ErrorHandler("Login first to access this resource.", 401)
        return res.status(401).json({
            message: "Login first to access this resource.",
            status: 401
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as IUser;
    // console.log(decoded.email)
    req.user = await User.findOne({ _id: decoded.id })
    next();
}
