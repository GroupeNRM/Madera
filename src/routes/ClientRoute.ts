import {Router} from "express";
import {ClientController} from "../controller/ClientController";

const router = Router();

router.post('/', ClientController.createClient);

export default router;