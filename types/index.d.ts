declare type Product = {
    id: string;
    name: string;
    description: string;
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

declare type Tag = {
    id: string;
    name: string;
    description: string;
};
