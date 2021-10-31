import express from 'express'
import { v1Router } from './router'
import { API_BASE_URL } from '../../constant'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

//Logger
import morgan from 'morgan'

export const createServer = async (): Promise<express.Application> => {

    const app: express.Application = express();

    app.use(cookieParser())
    app.use(cors({
        origin: "http://localhost:1234",
        credentials: true
    }))
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(express.json());
    app.use(morgan('dev'));
console.log("api-base-url",API_BASE_URL );

    app.use(`${API_BASE_URL}`, v1Router);

    app.listen(4000, () => {
        console.log(`[App]: Listening on PORT ${4000}`)
    })

    return app
}