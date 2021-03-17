import { Router } from "express";

import user from "./UserRoute";
import project from "./ProjectRoute";
import devis from "./DevisRoute";

const routes = Router();

routes.use("/user", user);
routes.use("/project", project)
routes.use("/devis", devis)

export default routes;