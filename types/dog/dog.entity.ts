export interface LittleDogInfoEntity {
    id: string;
    name: string;
    city: string;
}

export interface DogEntity extends LittleDogInfoEntity{
    description: string;
    shelterId?: string;
    phone?: string;
}

export interface SecDogEntity extends Omit<DogEntity, 'id'> {
    id?: string;
}


