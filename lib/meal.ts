export type ResponseData = {
    id: string;
    name: string;
    category: string;
    price: number;
    rate: number;
    date: string;
    phase: string;
};

export type InputData = {
    name: string;
    category: string;
    price: number;
    rate: number;
    date: string;
    phase: string;
    mood: string;
    note: string;
    place: string;
    weather: string;
    temperature: number;
};

export type DisplayData = {
    phase: string;
    mood: string;
    price: number;
    category: string;
    date: string;
}