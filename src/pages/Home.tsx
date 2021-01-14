import React, { useEffect, useState } from 'react';

import { Product, ProductColor } from '../types';
import { fetchProducts } from '../actions';
import ProductCard from './../components/ProductCard';
import Filter from './../components/Filter';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [colorFilter, setColorFilter] = useState<ProductColor>(
        ProductColor.All,
    );

    useEffect(() => {
        fetchProducts().then((products) => {
            setProducts(products.data);
        });
    }, []);

    let filteredProducts = products;

    if (colorFilter !== ProductColor.All) {
        filteredProducts = products.filter(
            (product) => product.colour === colorFilter,
        );
    }

    return (
        <div data-test="page-home">
            <Filter
                onSelect={(colour) => {
                    setColorFilter(colour);
                }}
            />
            {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    );
};

export default Home;
