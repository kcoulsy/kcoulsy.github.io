import axios from 'axios';

import { Product } from './types';

const PRODUCTS_URL =
    'https://my-json-server.typicode.com/benirvingplt/products/products';

export const fetchProducts = () => axios.get<Product[]>(PRODUCTS_URL);
