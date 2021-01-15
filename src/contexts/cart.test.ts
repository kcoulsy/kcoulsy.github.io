import React from 'react';
import { ProductColor } from '../types';
import { cartReducer, CartItem, CartActionType } from './cart';

const testProduct = {
    id: 1,
    name: 'test product',
    img: 'srclink',
    colour: ProductColor.Red,
    price: 10,
};

test('should add an item to the cart', () => {
    const initialTestCart: CartItem[] = [];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.AddToCart,
        payload: testProduct,
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ product: testProduct, quantity: 1 });
});

test('should increment item if added again', () => {
    const initialTestCart: CartItem[] = [
        {
            product: testProduct,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.AddToCart,
        payload: testProduct,
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ product: testProduct, quantity: 2 });
});

test('should be able to update quantity on an item', () => {
    const initialTestCart: CartItem[] = [
        {
            product: testProduct,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.UpdateQuantity,
        payload: {
            id: testProduct.id,
            quantity: 10,
        },
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ product: testProduct, quantity: 10 });
});

test('should be able to remove an item', () => {
    const initialTestCart: CartItem[] = [
        {
            product: testProduct,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.RemoveFromCart,
        payload: {
            id: testProduct.id,
        },
    });
    expect(state.length).toBe(0);
});

export {};
