import {DogEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface SecDogEntity extends Omit<DogEntity, 'id'> {
    id?: string;

}

export class DogRecord implements DogEntity {
    id: string;
    name: string;
    description?: string;
    city: string;

    constructor(obj: SecDogEntity) {
        // if (!obj.name || obj.name.length > 50 || obj.name.length < 1) {
        //     throw new ValidationError('Imię psa nie może być mniejsze niż 1 znak i większe niż 50 znaków :)');
        // }
        //
        // if (obj.description.length < 1 || obj.description.length > 65535 ) {
        //     throw new ValidationError('Opis psa nie może być mniejsze niż 1 znak i większe niż 65535 znaków :)');
        // }
        // if (!obj.city || obj.city.length < 1 || obj.city.length > 50 ) {
        //     throw new ValidationError('Miasto, w którym znajduje się pies, nie może mieć mniej niż 1 znak i więcej niż 50 znaków :)');
        // }
        this.name = obj.name;
        this.description = obj.description;
        this.city = obj.city;



    }
}
