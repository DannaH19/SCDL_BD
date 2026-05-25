import jwt from "jsonwebtoken";
import { ENV } from "../config/env";


export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}


export const signToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, ENV.JWT_SECRET as string, {
        expiresIn: '1d',
    });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, ENV.JWT_SECRET as string) as JwtPayload;
};