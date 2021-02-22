import { Router } from "express";
import {UserController} from "../controller/UserController";

const router = Router();

// Implements routes, see https://expressjs.com/fr/guide/routing.html for example
router.get('/', UserController.all);

router.get('/:id([0-9]+)', UserController.getOneById);

router.post('/', UserController.register);

router.post('/login', UserController.login);

router.post('/register', UserController.isAccountCreated);

export default router;