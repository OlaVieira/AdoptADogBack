import {AdopterEntity} from "../types";
import {ValErr} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';

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
            throw new ValErr('Imię i nazwisko nie może przekraczać 200 znaków, musi być dłuższe niż jeden znak!');
        }
        if (!obj.email || obj.email.length > 345 || obj.email.length < 4  || obj.email.includes("@")) {
            throw new ValErr('Email musi mięc więcej niż 4 znaki i mniej niż 345 znaków i musi zawierać "@".');
        }
        if (!obj.phone || typeof obj.phone !== 'number' ) {
            throw new ValErr('Numer telefonu musi składać się z 9 cyfr!');
        }

        this.id = obj.id;
        this.firstAndLastName = obj.firstAndLastName;
        this.email = obj.email;
        this.phone = obj.phone;


    }

    async addAdopter(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Taka osoba już istnieje.');
        }

        await pool.execute("INSERT INTO `adopters` (`id`, `firstAndLastName`, `email`, `phone`) VALUES(:id, :firstAndLastName, :email, :phone)", this)
    }
}
