import React from 'react';

import { CartActionType, useCartDispatchContext } from '../contexts/cart';

interface CartProductProps {
    productId: number;
    quantity: number;
}
const CartProduct: React.FC<CartProductProps> = ({ productId, quantity }) => {
    const dispatch = useCartDispatchContext();

    const handleRemoveItem = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({
            type: CartActionType.RemoveFromCart,
            payload: {
                productId,
            },
        });
    };

    const handleQtyIncrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                productId,
                quantity: quantity + 1,
            },
        });
    };
    const handleQtyDecrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (quantity === 1) {
            dispatch({
                type: CartActionType.RemoveFromCart,
                payload: {
                    productId,
                },
            });
            return;
        }
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                productId,
                quantity: quantity - 1,
            },
        });
    };

    return (
        <div data-test="component-cartproduct">
            Item: {productId}
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
