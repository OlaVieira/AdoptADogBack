import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValErr} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {dogRouter} from "./routers/dog.router";
import {adopterRouter} from "./routers/adopter.router";

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
const router = Router();
router.use('/dogs', dogRouter);
router.use('/adopt', adopterRouter);
app.use('/api', router);

app.get('/', async (req, res) => {
    throw new ValErr('O nie! :(');
});

app.use(handleErrors);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port: http://localhost:3001');
});
