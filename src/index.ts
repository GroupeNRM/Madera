import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes/index";

const port = 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();

    // app.use(helmet());
    app.use(
        cors({
            credentials: true,
            origin: `http://localhost:8000`
        })
    );

    app.use(express.json());

    app.use("/", routes)

    app.listen(port);

    console.log(`Server started on port ${port}`);

}).catch(error => console.log(error));
