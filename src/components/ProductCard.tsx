import React from 'react';
import { Product } from '../types';
import {
    useCartDispatchContext,
    CartActionType,
    useCartStateContext,
} from './../contexts/cart';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const cartItems = useCartStateContext();
    const dispatch = useCartDispatchContext();
    const productInCart = cartItems.find(
        (cartItem) => cartItem.productId === product.id,
    );
    const qtyInCart = productInCart?.quantity;

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
            {qtyInCart && <p>You have {qtyInCart} of this in your cart!</p>}
            <button data-test="productcard-addtocart" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
