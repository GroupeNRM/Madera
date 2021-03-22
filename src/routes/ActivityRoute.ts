import {Router} from "express";
import {ActivityController} from "../controller/ActivityController";
import {checkJwt} from "../middleware/auth";

const router = Router();

router.get('/', checkJwt, ActivityController.getLastFive);

export default router;