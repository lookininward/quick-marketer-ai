declare type Product = {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
};

declare type Persona = {
    id: string;
    name: string;
    age: number;
    height: number; // cm
    weight: number; // kg
    description: string;
    thumbnail?: string;
    education?: Education;
    occupation?: string;
    location?: string;
    relationship?: string;
    income?: number; // USD
};

declare type Platform = {
    id: string;
    name: PlatformEnum;
    about?: string;
};

declare type Tag = {
    id: string;
    name: string;
    description: string;
};
