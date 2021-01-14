import React, { useEffect, useState } from 'react';

import { Product } from '../types';
import { fetchProducts } from '../actions';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products.data);
        });
    }, []);

    return <div data-test="page-home">{JSON.stringify(products, null, 4)}</div>;
};

export default Home;
