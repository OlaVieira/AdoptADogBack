import {DogEntity, SecDogEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type DogRecordResults = [DogEntity[], FieldPacket[]];

export class DogRecord implements DogEntity {
    id: string;
    name: string;
    description?: string;
    city: string;

    constructor(obj: SecDogEntity) {
        // if (!obj.name || obj.name.length > 50 || obj.name.length < 1) {
        //     throw new ValErr('Imię psa nie może być mniejsze niż 1 znak i większe niż 50 znaków :)');
        // }
        //
        // if (obj.description.length < 1 || obj.description.length > 65535 ) {
        //     throw new ValErr('Opis psa nie może być mniejsze niż 1 znak i większe niż 65535 znaków :)');
        // }
        // if (!obj.city || obj.city.length < 1 || obj.city.length > 50 ) {
        //     throw new ValErr('Miasto, w którym znajduje się pies, nie może mieć mniej niż 1 znak i więcej niż 50 znaków :)');
        // }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.city = obj.city;

    }

    static async getOneDog(id: string): Promise<DogRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `dogs` WHERE id = :id", {
            id: id,
        }) as DogRecordResults;

        return results.length === 0? null : new DogRecord(results[0]);
    }

    static async getAllDogs(): Promise<DogRecord[]> | null {
        const [results] = await pool.execute("SELECT * FROM `dogs`") as DogRecordResults;

        return results.length === 0? null : results;
    }

    static async findAllCity(city: string): Promise<DogRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `dogs` WHERE `city` LIKE :search", {
            search: `%${city}%`,
        } ) as DogRecordResults;

        return results.map(result => {
            const {
                id, name, description, city,
            } = result;
            return {
                id, name, description, city,
            };
        });
    }

}
