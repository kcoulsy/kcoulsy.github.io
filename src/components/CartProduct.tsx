import React, { useEffect, useState } from 'react';

import { CartActionType, useCartDispatchContext } from '../contexts/cart';
import { Product } from '../types';
import Icon, { IconType } from './Icon';

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
                id: product.id,
            },
        });
    };

    const handleQtyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        const parsed = parseInt(value);
        if (parsed) {
            dispatch({
                type: CartActionType.UpdateQuantity,
                payload: {
                    id: product.id,
                    quantity: parsed,
                },
            });
        }
    };
    const handleQtyIncrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                id: product.id,
                quantity: quantity + 1,
            },
        });
    };

    const handleQtyDecrement = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (quantity === 1) {
            dispatch({
                type: CartActionType.RemoveFromCart,
                payload: {
                    id: product.id,
                },
            });
            return;
        }
        dispatch({
            type: CartActionType.UpdateQuantity,
            payload: {
                id: product.id,
                quantity: quantity - 1,
            },
        });
    };

    return (
        <tr data-test="component-cartproduct">
            <td className="hidden pb-4 md:table-cell">
                <a href="#">
                    <img
                        className="w-20 rounded"
                        src={product.img}
                        alt={product.name}
                        data-test="productcard-image"
                    />
                </a>
            </td>
            <td>
                <a href="#">
                    <p className="mb-2 md:ml-4">
                        {product.name}
                        <span className="text-sm uppercase text-gray-400 pl-2">
                            {product.colour}
                        </span>
                    </p>
                    <button
                        type="submit"
                        className="text-gray-700 md:ml-4 hover:text-gray-500"
                        onClick={handleRemoveItem}
                        data-test="cartproduct-removebutton"
                    >
                        <small>(Remove item)</small>
                    </button>
                </a>
            </td>
            <td>
                <div className="flex justify-end ">
                    <div className="w-24 h-10 flex">
                        <button
                            data-test="cartproduct-qty-dec"
                            onClick={handleQtyDecrement}
                        >
                            <Icon
                                icon={IconType.Minus}
                                styles="w-4 h-4 hover:text-gray-500 cursor-pointer"
                            />
                        </button>
                        <div className="relative flex flex-row w-full h-8 mx-2">
                            <input
                                type="text"
                                value={quantity}
                                className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
                                onChange={handleQtyChange}
                                data-test="cartproduct-qty-input"
                            />
                        </div>
                        <button
                            data-test="cartproduct-qty-inc"
                            onClick={handleQtyIncrement}
                        >
                            <Icon
                                icon={IconType.Plus}
                                styles="w-4 h-4 hover:text-gray-500 cursor-pointer"
                            />
                        </button>
                    </div>
                </div>
            </td>
            <td className="text-right">
                <span className="text-sm lg:text-base font-medium">
                    £{product.price}
                </span>
            </td>
        </tr>
    );
};

export default CartProduct;
