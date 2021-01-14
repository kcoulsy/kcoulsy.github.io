import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types';

const PRODUCTS_URL =
    'https://my-json-server.typicode.com/benirvingplt/products/products';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get<Product[]>(PRODUCTS_URL);
            if (response.status === 200) {
                setProducts(response.data);
            }
        }
        fetchProducts();
    }, []);

    return <>{JSON.stringify(products, null, 4)}</>;
};

export default Home;
