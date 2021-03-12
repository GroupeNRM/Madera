import { Router } from "express";
import {UserController} from "../controller/UserController";
import {checkJwt} from "../middleware/auth";

const router = Router();

// Implements routes, see https://expressjs.com/fr/guide/routing.html for example
router.get('/', checkJwt, UserController.all);

router.get('/:id([0-9]+)', checkJwt, UserController.getOneById);

router.post('/', UserController.register);

router.post('/login', UserController.login);

router.get('/me', checkJwt, UserController.me);

router.put('/validate', UserController.validate);

export default router;