import { Router } from "express";

import user from "./UserRoute";
import project from "./ProjectRoute";

const routes = Router();

routes.use("/user", user);
routes.use("/project", project)

export default routes;