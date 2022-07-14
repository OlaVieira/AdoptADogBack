import {Router} from 'express';
import {DogRecord} from "../records/dog.record";

//pobieramy jednego psa, wszystkie psy, i psy z miastem
//@TODO dodac post - zeby stworzyc psa przy formularzu, dodac do bazy danych
export const dogRouter = Router()
    .get('/search', async (req, res) => {
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
    .post('/add', async (req, res) => {
        const dog = new DogRecord(req.body);
        await dog.addDog()
        res.json(dog);
    })
