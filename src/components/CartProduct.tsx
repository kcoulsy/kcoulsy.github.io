import React, { useEffect, useState } from 'react';

import { CartActionType, useCartDispatchContext } from '../contexts/cart';
import { Product } from '../types';

interface CartProductProps {
    quantity: number;
    product: Product;
}

const CartProduct: React.FC<CartProductProps> = ({ quantity, product }) => {
    const dispatch = useCartDispatchContext();

    const handleRemoveItem = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({
            type: CartActionType.RemoveFromCart,
            payload: {
                productId: product.id,
            },
        });
    };

    const handleQtyIncrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                productId: product.id,
                quantity: quantity + 1,
            },
        });
    };
    const handleQtyDecrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (quantity === 1) {
            dispatch({
                type: CartActionType.RemoveFromCart,
                payload: {
                    productId: product.id,
                },
            });
            return;
        }
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                productId: product.id,
                quantity: quantity - 1,
            },
        });
    };

    return (
        <div data-test="component-cartproduct">
            Item: {product.id}
            {product.name}
            {product.colour}£{product.price}
            <img
                src={product.img}
                alt={product.name}
                data-test="productcard-image"
            />
            <div>
                Qty:
                <button
                    data-test="cartproduct-qty-inc"
                    onClick={handleQtyIncrement}
                >
                    +
                </button>
                <span data-test="cartproduct-quantity">{quantity}</span>
                <button
                    data-test="cartproduct-qty-dec"
                    onClick={handleQtyDecrement}
                >
                    -
                </button>
            </div>
            <button
                onClick={handleRemoveItem}
                data-test="cartproduct-removebutton"
            >
                Remove Item
            </button>
        </div>
    );
};

export default CartProduct;
