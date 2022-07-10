import {Router} from 'express';
import {DogRecord} from "../records/dog.record";

export const dogRouter = Router()
    .get('/', async (req, res) => {
        const dogsInfo = await DogRecord.getAllDogs();
        res.json(dogsInfo);
    })
    .get('/:id', async (req, res) => {
        const dogInfo = await DogRecord.getOneDog(req.params.id);
        res.json(dogInfo);
    })
    .get('/search/:city?', async (req, res) => {
        const dogsInfoCity = await DogRecord.findAllDogsCity(req.params.city ?? '');
        res.json(dogsInfoCity);
    })
