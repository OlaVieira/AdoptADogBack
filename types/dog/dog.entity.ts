export interface LittleDogInfoEntity {
    id: string;
    name: string;
    city: string;
}

export interface DogEntity extends LittleDogInfoEntity{
    description: string;
}

export interface SecDogEntity extends Omit<DogEntity, 'id'> {
    id?: string;
}


