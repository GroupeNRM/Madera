import {Router} from "express";
import {DevisController} from "../controller/DevisController";

const router = Router();

router.post('/', DevisController.createDevis);

export default router;