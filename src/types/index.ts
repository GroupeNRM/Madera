import { Session } from 'express-session'
import {User} from "../entity/User";
import {Request} from "express";

export interface IGetUserAuthInfoRequest extends Request {
    user: User
}