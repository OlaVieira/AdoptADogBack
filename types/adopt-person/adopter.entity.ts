//potrzebne do malej informacji gdy wyswietlamy cala liste
export interface LittleAdopterInfoEntity {
    id: string;
    firstAndLastName: string;
}

//dy chcemy jednego adoptera i jego informacje jaki ma email i tel
export interface AdopterEntity extends LittleAdopterInfoEntity{
    phone: string;
    email: string;
}

export interface SecAdopterEntity extends Omit<AdopterEntity, 'id'> {
    id?: string;
}
