import {AdopterEntity, SecAdopterEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";


type AdopterRecordResults = [AdopterEntity[], FieldPacket[]];

export class AdopterRecord implements AdopterEntity {
    id: string;
    firstAndLastName: string;
    email: string;
    phone: string;

    constructor(obj: SecAdopterEntity) {

        if (!obj.firstAndLastName || obj.firstAndLastName.length > 200 || obj.firstAndLastName.length < 1) {
            throw new ValErr('Imię i nazwisko nie może przekraczać 200 znaków, musi być dłuższe niż jeden znak!');
        }
        if (!obj.email || obj.email.length > 345 || obj.email.length < 4  || obj.email.includes("@")) {
            throw new ValErr('Email musi mięc więcej niż 4 znaki i mniej niż 345 znaków i musi zawierać "@".');
        }
        if (!obj.phone || obj.phone.length !== 9 ) {
            throw new ValErr('Numer telefonu musi składać się z 9 cyfr!');
        }

        this.id = obj.id;
        this.firstAndLastName = obj.firstAndLastName;
        this.email = obj.email;
        this.phone = obj.phone;


    }

    static async getPerson(id: string): Promise<AdopterRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `adopters` WHERE `id` = :id", {
            id: id,
        }) as AdopterRecordResults;

        return results.length === 0 ? null : new AdopterRecord(results[0]);
    }

    async addAdopter(): Promise<void> {
        // spr czy id istnieje
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error(
                'Taka osoba już istnieje.'
            );
        }
        //jesli nie ma id to robimy zapytanie i dodajemy do bazy danych adopters
        await pool.execute("INSERT INTO `adopters` (`id`, `firstAndLastName`, `email`, `phone`) VALUES(:id, :firstAndLastName, :email, :phone)", this)
    }

}
