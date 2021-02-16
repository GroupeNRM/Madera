import {Router} from "express";
import {ProjectController} from "../controller/ProjectController";

const router = Router();

router.post('/', ProjectController.createProject);

export default router;