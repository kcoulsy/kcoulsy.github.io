import React, { useEffect, useState } from 'react';

import { Product } from '../types';
import { fetchProducts } from '../actions';
import ProductCard from './../components/ProductCard';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products.data);
        });
    }, []);

    return (
        <div data-test="page-home">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default Home;
