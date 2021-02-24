import {Router} from "express";
import {DevisController} from "../controller/DevisController";

const router = Router();

router.post('/', DevisController.createDevis);

router.get('/:id([0-9]+)', DevisController.findOneById)

export default router;