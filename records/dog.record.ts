import {DogEntity, LittleDogInfoEntity, SecDogEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type DogRecordResults = [DogEntity[], FieldPacket[]];

export class DogRecord implements DogEntity {
    id: string;
    name: string;
    description: string;
    city: string;
    shelterId: string;
    phone: string;

    constructor(obj: SecDogEntity) {
        //walidacja! jesli bedzie opcja dodawania psa przez formularz to się przyda i do bazy tez
        if (!obj.name || obj.name.length > 50 || obj.name.length < 1) {
            throw new ValErr('Imię psa nie może być mniejsze niż 1 znak i większe niż 50 znaków :)');
        }

        if (obj.description.length < 1 || obj.description.length > 65535 ) {
            throw new ValErr('Opis psa nie może być mniejsze niż 1 znak i większe niż 65535 znaków :)');
        }
        if (!obj.city || obj.city.length < 1 || obj.city.length > 50 ) {
            throw new ValErr('Miasto, w którym znajduje się pies, nie może mieć mniej niż 1 znak i więcej niż 50 znaków :)');
        }


        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.city = obj.city;
        this.shelterId = obj.shelterId;
        this.phone = obj.phone;

    }
    //szukamy konkretnego pieseła, pamietaj ze moze byc null, chcemy wszystkie informacje razem z opisem

    static async getOneDog(id: string): Promise<DogRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `dogs` WHERE `id` = :id", {
            id: id,
        }) as DogRecordResults;

        return results.length === 0? null : new DogRecord(results[0]);
    }
    //chcemy wszystkie psy pobrac, ale tylko część informacji dajemy na frontend bez opisu
    //chciałabym umiec przechowywac zdjecia w bazie danych, ale nie umiem- sprobowac znalezc sposob, jak nie to zdjecie bedzie to samo generowane

    static async getAllDogs(): Promise<LittleDogInfoEntity[]> | null {
        const [results] = await pool.execute("SELECT * FROM `dogs`") as DogRecordResults;

        return results.length === 0? null : results.map(result => {
            const {
                id, name, city,
            } = result;
            return {
                id, name, city,
            };
        });
    }
    //potrzebne przy wyszukiwarce
    //szukamy wszystkich psów ktore maja konkretne miasto
    //pamietaj-moze byc null
    static async findAllDogsCity(city: string): Promise<LittleDogInfoEntity[]> | null {
        //w bazie danych szukamy te psy ktore maja miasto jak to(like) przy wyszukiwaniu
        const [results] = await pool.execute("SELECT * FROM `dogs` WHERE `city` LIKE :search", {
            search: `%${city}%`,
        } ) as DogRecordResults;

        //jesli nie ma dajemy null, jesli są to mapujemy i wysylamy tylko id, imie psa i miasto, bez opisu
        return results.length === 0? null : results.map(result => {
            const {id, name, city} = result;
            return {id, name, city};
        });
    }
    //@TODO - stworzmy psa i dodajmy do bazy
    async addDog(): Promise<void> {
        // spr czy id istnieje
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error( 'Przykro nam. Taki pies już istnieje :(.');
        }
        //jesli nie ma id to robimy zapytanie i dodajemy do bazy danych adopters
        await pool.execute("INSERT INTO `dogs` (`id`, `name`, `description`, `city`,`phone`) VALUES(:id, :name, :description, :city, :phone)", {
            id: this.id,
            name: this.name,
            description: this.description,
            city: this.city,
            phone: this.phone,
        });
    }
}
