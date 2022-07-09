import {AdopterEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface SecAdopterEntity extends Omit<AdopterEntity, 'id'> {
    id?: string;

}

export class AdopterRecord implements SecAdopterEntity {
    id: string;
    firstAndLastName: string;
    email: string;
    phone: number;

    constructor(obj: SecAdopterEntity) {

        if (!obj.firstAndLastName || obj.firstAndLastName.length > 200 || obj.firstAndLastName.length < 1) {
            throw new ValidationError('Imię i nazwisko nie może przekraczać 200 znaków, musi być dłuższe niż jeden znak!');
        }
        if (!obj.email || obj.email.length > 345 || obj.email.length < 4  || obj.email.includes("@")) {
            throw new ValidationError('Email musi mięc więcej niż 4 znaki i mniej niż 345 znaków i musi zawierać "@".');
        }
        if (!obj.phone || typeof obj.phone !== 'number' ) {
            throw new ValidationError('Numer telefonu musi składać się z 9 cyfr!');
        }

        this.firstAndLastName = obj.firstAndLastName;
        this.email = obj.email;
        this.phone = obj.phone;
    }
}
