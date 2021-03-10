import {User, UserRole} from "../entity/User";
import {NextFunction, Response} from "express";
import {IGetUserAuthInfoRequest} from "../types";

const jwt = require("jsonwebtoken");
require('dotenv').config();

export function generateAccessToken(user: User): string {
    // Little workaround because user is typed as a User
    return jwt.sign({...user}, process.env.TOKEN_SECRET, {
        expiresIn: "10h"
    })
}

export function checkJwt(request: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, ((err, decoded: User) => {
            if(err) {
                res.sendStatus(403);
            }

            request.user = decoded;
            if(decoded.role === UserRole.ADMIN) {
                next();
            } else {
                res.sendStatus(403);
            }
        }));
    } else {
        res.sendStatus(401);
    }
}