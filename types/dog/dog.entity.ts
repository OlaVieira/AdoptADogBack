export interface DogEntity {
    id: string;
    name: string;
    description?: string;
    city: string;
}

export interface SecDogEntity extends Omit<DogEntity, 'id'> {
    id?: string;
}
