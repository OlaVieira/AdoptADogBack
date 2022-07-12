import {Router} from "express";
import {AdopterRecord} from "../records/adopt-person.record";

export const adopterRouter = Router()
    .get('/', async (req, res) => {
        const adopters = await AdopterRecord.getAllAdopters();
        res.json(adopters);
    })
    .get('/:id', async (req, res) => {
        const adopter = await AdopterRecord.getOneAdopter(req.params.id);
        res.json(adopter);
    })
    .post('/add/:id', async (req, res) => {
        const adopter = new AdopterRecord(req.body);
        await adopter.addAdopter()
        res.json(adopter);
    })


