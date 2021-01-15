import React, { Dispatch, createContext, useReducer, useContext } from 'react';
import { Product } from './../types';

export interface CartItem {
    product: Product;
    quantity: number;
}

export enum CartActionType {
    AddToCart,
    UpdateQuantity,
    RemoveFromCart,
}

interface AddToCartAction {
    type: CartActionType.AddToCart;
    payload: Product;
}

interface UpdateQuantityAction {
    type: CartActionType.UpdateQuantity;
    payload: {
        id: number;
        quantity: number;
    };
}

interface RemoveFromCartAction {
    type: CartActionType.RemoveFromCart;
    payload: {
        id: number;
    };
}

export type CartAction =
    | AddToCartAction
    | UpdateQuantityAction
    | RemoveFromCartAction;

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

const initialCartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

export const CartStateContext = createContext<CartState>(initialCartState);
export const CartDispatchContext = createContext<Dispatch<CartAction>>(
    () => {},
);

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case CartActionType.AddToCart:
            const existingItem = state.find(
                (item) => item.product.id === action.payload.id,
            );
            if (existingItem) {
                // If the item was in the cart already we will increment the qty by 1
                const oldQty = existingItem.quantity;
                const newState = [
                    ...state.filter(
                        (item) => item.product.id !== action.payload.id,
                    ),
                    {
                        product: action.payload,
                        quantity: oldQty + 1,
                    },
                ];

                return newState;
            }
            return [...state, { product: action.payload, quantity: 1 }];

        case CartActionType.UpdateQuantity:
            return state.map((item) => {
                if (item.product.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });
        case CartActionType.RemoveFromCart:
            return state.filter((item) => {
                if (item.product.id != action.payload.id) {
                    return item;
                }
            });
        default:
            return state;
    }
}

const CartContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, []);
    const totalQuantity = state.reduce((acc, curr) => {
        acc += curr.quantity;
        return acc;
    }, 0);
    const totalPrice = state.reduce((acc, curr) => {
        acc += curr.product.price;
        return acc;
    }, 0);
    const stateContextValue = {
        items: state,
        totalQuantity,
        totalPrice,
    };
    return (
        <CartStateContext.Provider value={stateContextValue}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export const useCartStateContext = () => useContext(CartStateContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);

export default CartContextProvider;
