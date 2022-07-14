import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {LittleShelterInfoEntity, SecShelterEntity, ShelterEntity} from "../types";


type ShelterRecordResults = [ShelterEntity[], FieldPacket[]];

export class ShelterRecord implements ShelterEntity {
    id: string;
    name: string;
    email: string;
    phone: number;
    address: string;

    constructor(obj: SecShelterEntity) {

        if (!obj.name || obj.name.length > 100 || obj.name.length < 1) {
            throw new ValErr('Nazwa schroniska wymagana!');
        }
        if (!obj.email || obj.email.length > 345 || obj.email.length < 4  || !obj.email.includes("@")) {
            throw new ValErr('Email musi mięc więcej niż 4 znaki i mniej niż 345 znaków i musi zawierać "@".');
        }
        // if (!obj.phone || typeof obj.phone !== 'number') {
        //     throw new ValErr('Numer telefonu musi składać się z 9 cyfr!');
        // }
        if (!obj.address || obj.address.length > 200 || obj.address.length < 10 ) {
            throw new ValErr('Adres schroniska musi składać się z miasta, kodu, ulicy i numeru. Nie może przekraczać 200 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.phone = obj.phone;
        this.address = obj.address;


    }
    // wyswietlamy małe info o schroniskach - listę
    static async getAllShelters(): Promise<LittleShelterInfoEntity[]> | null {
        //pobieramy z bazy z tabelki adopters wszystkie wyniki
        const [results] = await pool.execute("SELECT * FROM `shelters`") as ShelterRecordResults;
        // jesli nie ma wynikow to zwracany jest null
        return results.length === 0? null : results.map(result => {
            //chcemy tylko wyswietlac id i nazwe schroniska bez emaila i numeru tel i adresu, bo to bedzie przy zwracaniu jednego rekordu
            const {id, name} = result;
            return {id, name};
        });
    }


    //jesli chcemy wyswietlac cale info - jak wejdziemy w nazwe schroniska mozemy podejrzec wiecej danych
    //moze zwracac null
    static async getOneShelter(id: string): Promise<ShelterRecord | null> {
        //wybieramy ze schronisk id
        const [results] = await pool.execute("SELECT * FROM `shelters` WHERE `id` = :id", {
            id,
        }) as ShelterRecordResults;

        return results.length === 0 ? null : new ShelterRecord(results[0]);
    }



}
