import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import argon2 from "argon2";
import {generateAccessToken} from "../middleware/auth";
import {IGetUserAuthInfoRequest} from "../types";
import {sendMail} from "../services/MailService";

export class UserController {
    static async all(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "firstName", "role"]
        });

        response.send(users);
    }

    static getOneById = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(request.params.id, {
                select: ["id", "firstName", "lastName", "role"]
            });
        } catch (error) {
            return response.status(404).send({message: "User not found"});
        }

        response.send(user);
    }

    /**
     * Try to save a new user, return an error response if the email is already taken
     * @param request
     * @param response
     */
    static async register(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const { firstName, lastName, password, email, role } = request.body;

        const hashedPassword = await argon2.hash(password);

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = hashedPassword;
        user.email = email;
        user.role = role;

        try {
            await userRepository.save(user);
        } catch ({errno}) {
            if(errno === 1062) {
                return response.status(400).json({message: "This email is already used"});
            }
        }

        response.send(user);

        await sendMail(user.email, 'Bienvenue sur Madera !');
    }

    /**
     * Check if given data correspond to database data.
     * @param request
     * @param response
     */
    static async login(request: Request, response: Response) {
        const userRepository = getRepository(User);
        const {email, password} = request.body;

        const user = await userRepository.findOne({
            email
        })

        if(!user) {
            return response.status(401).send({message: "Aucun utilisateur avec cette adresse e-mail"});
        }

        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid) {
            return response.status(401).send({message: "Le mot de passe ne correspond pas"})
        }

        response.json(generateAccessToken(user));
    }

    /**
     * Delete Madera user account
     * @param request
     * @param response
     */
    static async remove(request: Request, response: Response) {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
    }

    /**
     * Get information about the current logged user
     * @param request
     * @param response
     */
    static async me(request: IGetUserAuthInfoRequest, response: Response) {
        const userRepository = getRepository(User);
        let user: User;
        let id = request.user.id;

        try {
            user = await userRepository.findOneOrFail(id, {
                select: ["id", "firstName", "lastName", "role"]
            });
        } catch (error) {
            return response.status(404).send({message: "User not found"});
        }

        response.send(user);
    }
}