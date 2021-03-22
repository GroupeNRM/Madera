import { Router } from "express";

import user from "./UserRoute";
import project from "./ProjectRoute";
import activity from "./ActivityRoute";
import range from "./RangeRoute";

const routes = Router();

routes.use("/user", user);
routes.use("/project", project);
routes.use('/activity', activity);
routes.use('/range', range)

export default routes;