import React from 'react';
import { cartReducer, CartItem, CartActionType } from './cart';

test('should add an item to the cart', () => {
    const initialTestCart: CartItem[] = [];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.AddToCart,
        payload: {
            productId: 1,
        },
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ productId: 1, quantity: 1 });
});

test('should increment item if added again', () => {
    const initialTestCart: CartItem[] = [
        {
            productId: 1,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.AddToCart,
        payload: {
            productId: 1,
        },
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ productId: 1, quantity: 2 });
});

test('should be able to update quantity on an item', () => {
    const initialTestCart: CartItem[] = [
        {
            productId: 1,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.UpdateQuantity,
        payload: {
            productId: 1,
            quantity: 10,
        },
    });
    expect(state.length).toBe(1);
    expect(state[0]).toEqual({ productId: 1, quantity: 10 });
});

test('should be able to remove an item', () => {
    const initialTestCart: CartItem[] = [
        {
            productId: 1,
            quantity: 1,
        },
    ];
    const state = cartReducer(initialTestCart, {
        type: CartActionType.RemoveFromCart,
        payload: {
            productId: 1,
        },
    });
    expect(state.length).toBe(0);
});

export {};
