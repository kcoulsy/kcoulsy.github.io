import React from 'react';
import { Product } from '../types';
import { useCartDispatchContext, CartActionType } from './../contexts/cart';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useCartDispatchContext();

    const handleAddToCart = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        dispatch({
            type: CartActionType.AddToCart,
            payload: {
                productId: product.id,
            },
        });
    };

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
            <button data-test="productcard-addtocart" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
