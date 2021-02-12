import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from 'express-session';
import { Session } from "./entity/Session";

import routes from "./routes/index";
import {TypeormStore} from "connect-typeorm";

const port = 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();

    const sessionRepository = connection.getRepository(Session);

    // app.use(helmet());
    app.use(
        cors({
            credentials: true,
            origin: `http://localhost:${port}`
        })
    );

    app.use(
        session({
            name: 'qid',
            store: new TypeormStore({
                cleanupLimit: 2,
                limitSubquery: false,
                ttl: 86400,
            }).connect(sessionRepository),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: "/"
            },
            secret: 'OwOThisIsAReallySecr3tKeY',
            resave: false,
            saveUninitialized: false
        })
    )

    app.use(express.json());

    app.use("/", routes)

    app.listen(port);

    console.log(`Server started on port ${port}`);

}).catch(error => console.log(error));
