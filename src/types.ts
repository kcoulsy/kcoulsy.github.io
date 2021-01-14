export interface Product {
    id: number;
    colour: ProductColor;
    name: string;
    price: number;
    img: string;
}

export enum ProductColor {
    Black = 'Black',
    Stone = 'Stone',
    Red = 'Red',
}
