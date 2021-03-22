import {Router} from "express";
import {RangeController} from "../controller/RangeController";
import {checkJwt} from "../middleware/auth";

const router = Router();

router.post('/', checkJwt, RangeController.add);

router.get('/', checkJwt, RangeController.findAll);

router.get('/getLast', checkJwt, RangeController.findLastOne);

export default router;