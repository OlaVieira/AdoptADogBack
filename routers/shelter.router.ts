import {Router} from 'express';
import {ShelterRecord} from "../records/shelter.record";


//pobieramy jedno schronisko i wszystkie schroniska -get

export const shelterRouter = Router()
    .get('/', async (req, res) => {
        const shelterInfo = await ShelterRecord.getAllShelters();
        res.json(shelterInfo);
    })
    .get('/:id', async (req, res) => {
        const shelterInfo = await ShelterRecord.getOneShelter(req.params.id);
        res.json(shelterInfo);
    })

