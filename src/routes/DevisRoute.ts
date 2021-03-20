import { Router } from "express";
import { DevisController } from "../controller/DevisController";

const router = Router();

router.post('/', DevisController.createDevis);

router.get('/:id([0-9]+)', DevisController.findOneById);

router.put('/:id([0-9]+)', DevisController.archiveDevis);

router.put('/:id([0-9]+)', DevisController.updateDevis);

router.get('/', DevisController.findAll);

export default router;