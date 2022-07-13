import {Router} from 'express';
import {ShelterRecord} from "../records/shelter.record";


//pobieramy jednego psa, wszystkie psy, i psy z miastem
//@TODO dodac post - zeby stworzyc psa przy formularzu, dodac do bazy danych
export const shelterRouter = Router()
    .get('/', async (req, res) => {
        const shelterInfo = await ShelterRecord.getAllShelters();
        res.json(shelterInfo);
    })
    .get('/:id', async (req, res) => {
        const shelterInfo = await ShelterRecord.getOneShelter(req.params.id);
        res.json(shelterInfo);
    })

