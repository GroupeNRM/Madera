import {Router} from "express";
import {ProjectController} from "../controller/ProjectController";

const router = Router();

router.post('/', ProjectController.createProject);

router.get('/:id([0-9]+)', ProjectController.findOneById)

router.put('/:id([0-9]+)', ProjectController.archiveProject)

export default router;