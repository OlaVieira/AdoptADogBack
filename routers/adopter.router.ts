import {Router} from "express";
import {AdopterRecord} from "../records/adopt-person.record";

export const adopterRouter = Router()
    .post('/', async (req, res) => {
        const person = new AdopterRecord(req.body);
        await person.addAdopter()
        res.json(person);
    })
    .get('/:id', async (req, res) => {
        const person = await AdopterRecord.getPerson(req.params.id);
        res.json(person);
    })

