export interface AdopterEntity {
    id: string;
    firstAndLastName: string;
    email: string;
    phone: string;
}

export interface SecAdopterEntity extends Omit<AdopterEntity, 'id'> {
    id?: string;
}
