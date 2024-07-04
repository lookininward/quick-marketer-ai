declare type Product = {
    id: string;
    name: string;
    price: number;
};

declare type Persona = {
    id: string;
    name: string;
};

declare type Platform = {
    id: string;
    name: PlatformEnum;
    about?: string;
};

declare type Subject = {
    id: string;
    name: string;
    description: string;
};
