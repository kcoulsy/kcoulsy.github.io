import axios from 'axios';
import { Product } from './types';

const PRODUCTS_URL =
    'https://my-json-server.typicode.com/benirvingplt/products/products';

export const fetchProducts = () => axios.get<Product[]>(PRODUCTS_URL);

export const fetchCart = async (ids: number[]) => {
    const products = await fetchProducts();

    const filteredProducts = products.data.filter((product) =>
        ids.includes(product.id),
    );

    return Promise.resolve({ data: filteredProducts });
};
