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

    return (
        <div data-test="component-cartproduct">
            Item: {productId} - Qty: {quantity}
            <button onClick={handleRemoveItem}>Remove Item</button>
        </div>
    );
};

export default CartProduct;
