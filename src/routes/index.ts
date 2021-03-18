import { Router } from "express";

import user from "./UserRoute";
import project from "./ProjectRoute";
import client from "./ClientRoute";
import devis from "./DevisRoute";

const routes = Router();

routes.use("/user", user);
routes.use("/project", project);
routes.use("/client", client);
routes.use("/devis", devis);

export default routes;