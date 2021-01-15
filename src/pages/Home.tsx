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
        <div data-test="page-home" className="container mx-auto mt-6">
            <div className="flex justify-between items-center mx-10 md:mx-0">
                <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                    Products
                </h2>
                <div className="flex items-center">
                    <span className="font-bold text-2xl pr-3">Color:</span>
                    <Filter onSelect={(colour) => setColorFilter(colour)} />
                </div>
            </div>
            <div className="flex flex-row flex-wrap mx-auto">
                {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default Home;
