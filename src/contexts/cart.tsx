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

type CartAction = AddToCartAction | UpdateQuantityAction | RemoveFromCartAction;

export const CartStateContext = createContext<CartItem[]>([]);
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
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export const useCartStateContext = () => useContext(CartStateContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);

export default CartContextProvider;
