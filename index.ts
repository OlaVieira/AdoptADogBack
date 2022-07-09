import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/errors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
    }
));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,

}))

//routers
app.get('/', async (req, res) => {
    throw new ValidationError('O nie! :(');
});

app.use(handleErrors);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
