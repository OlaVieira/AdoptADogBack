import {AdopterEntity, SecAdopterEntity, LittleAdopterInfoEntity, LittleDogInfoEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";


type AdopterRecordResults = [AdopterEntity[], FieldPacket[]];

export class AdopterRecord implements AdopterEntity {
    id: string;
    firstAndLastName: string;
    email: string;
    phone: number;
    wantedDogs: string;

    constructor(obj: SecAdopterEntity) {

        if (!obj.firstAndLastName || obj.firstAndLastName.length > 200 || obj.firstAndLastName.length < 2) {
            throw new ValErr('Imię i nazwisko nie może przekraczać 200 znaków, musi być dłuższe niż jeden znak!');
        }
        if (!obj.email || obj.email.length > 345 || obj.email.length < 4  || !obj.email.includes("@")) {
            throw new ValErr('Email musi mięc więcej niż 4 znaki i mniej niż 345 znaków i musi zawierać "@".');
        }
       //@TODO -poprawić walidację telefonu - typeof obj.phone!== "number"
        if (!obj.wantedDogs || obj.wantedDogs.length > 50 || obj.wantedDogs.length < 1 ) {
            throw new ValErr('Musisz wpisać imię psa lub imiona psów, które chcesz adoptować');
        }

        this.id = obj.id;
        this.firstAndLastName = obj.firstAndLastName;
        this.email = obj.email;
        this.phone = obj.phone;
        this.wantedDogs = obj.wantedDogs;

    }
    //admin bedzie miał do wglądu, jeśli admin kiedyś powstanie w tej aplikacji ..
    //wyswietlamy mniej informacji
    static async getAllAdopters(): Promise<LittleAdopterInfoEntity[]> | null {
        //pobieramy z bazy z tabelki adopters wszystkie wyniki
        const [results] = await pool.execute("SELECT * FROM `adopters`") as AdopterRecordResults;
        // jesli nie ma wynikow to zwracany jest null
        return results.length === 0? null : results.map(result => {
            //chcemy tylko wyswietlac id i imie i nazwisko, bez emaila i numeru tel, bo to bedzie przy zwracaniu jednego rekordu
            const {id, firstAndLastName} = result;
            return {id, firstAndLastName};
        });
    }

    //do formularza adopcji:
    //dodajemy adoptera, robimy spr czy id jest, dodajemy mu uuid jesli nie bylo takiego id, jesli id jest to blad

    async addAdopter(): Promise<void> {
        // spr czy id istnieje
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error( 'Przykro nam. Taka osoba już istnieje :(.');
        }
        //jesli nie ma id to robimy zapytanie i dodajemy do bazy danych adopters
        await pool.execute("INSERT INTO `adopters` (`id`, `firstAndLastName`, `email`, `phone`, `wantedDogs`) VALUES(:id, :firstAndLastName, :email, :phone, :wantedDogs)", {
            id: this.id,
            firstAndLastName: this.firstAndLastName,
            email: this.email,
            phone: this.phone,
            wantedDogs: this.wantedDogs,
        });
    }

    //jesli chcemy bardziej sprawdzic dane jednego adoptera czyli podejrzec telefon czy email to szukamy po id
    //wybierz adopter record results a nie adopterentity czyli littleadopterinfoentity bo chcemy wyswietlac wszystko
    //moze zwracac null
    static async getOneAdopter(id: string): Promise<AdopterRecord | null> {
        //wybieramy z adopterów konkretne id ktore podamy w zapytaniu
        const [results] = await pool.execute("SELECT * FROM `adopters` WHERE `id` = :id", {
            id,
        }) as AdopterRecordResults;

        return results.length === 0 ? null : new AdopterRecord(results[0]);
    }



}
