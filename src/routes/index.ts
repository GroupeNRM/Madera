import { Router } from "express";

import user from "./UserRoute";

const routes = Router();

routes.use("/user", user);

export default routes;