import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div data-test="component-productcard">
            <img
                src={product.img}
                alt={product.name}
                data-test="productcard-image"
            />
            <ul>
                <li>{product.id}</li>
                <li>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.colour}</li>
            </ul>
        </div>
    );
};

export default ProductCard;
