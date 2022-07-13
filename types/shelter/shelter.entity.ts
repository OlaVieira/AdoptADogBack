//potrzebne do malej informacji gdy wyswietlamy cala liste
export interface LittleShelterInfoEntity {
    id: string;
    name: string;
}

//gdy chcemy wyswietlic tylko jedno schronisko, info szczegółowe o nim
export interface ShelterEntity extends LittleShelterInfoEntity{
    phone: string;
    email: string;
    address: string;
}

export interface SecShelterEntity extends Omit<ShelterEntity, 'id'> {
    id?: string;
}
