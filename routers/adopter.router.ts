import {Router} from "express";
import {AdopterRecord} from "../records/adopt-person.record";

export const adopterRouter = Router()
    .post('/', async (req, res) => {
        const adopter = new AdopterRecord(req.body);
        await adopter.addAdopter()
        res.json(adopter);
    })
