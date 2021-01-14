import React, { Dispatch, createContext, useReducer, useContext } from 'react';

export interface CartItem {
    productId: number;
    quantity: number;
}

export enum CartActionType {
    AddToCart,
    UpdateQuantity,
    RemoveFromCart,
}

interface AddToCartAction {
    type: CartActionType.AddToCart;
    payload: {
        productId: number;
    };
}

interface UpdateQuantityAction {
    type: CartActionType.UpdateQuantity;
    payload: CartItem;
}

interface RemoveFromCartAction {
    type: CartActionType.RemoveFromCart;
    payload: {
        productId: number;
    };
}

type CartAction = AddToCartAction | UpdateQuantityAction | RemoveFromCartAction;

const CartStateContext = createContext<CartItem[]>([]);
const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case CartActionType.AddToCart:
            if (
                state.find(
                    (item) => item.productId === action.payload.productId,
                )
            ) {
                return state.map((item) => {
                    if (item.productId === action.payload.productId) {
                        item.quantity++;
                    }
                    return item;
                });
            }
            return [
                ...state,
                { productId: action.payload.productId, quantity: 1 },
            ];

        case CartActionType.UpdateQuantity:
            return state.map((item) => {
                if (item.productId === action.payload.productId) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });
        case CartActionType.RemoveFromCart:
            return state.filter((item) => {
                if (item.productId != action.payload.productId) {
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
export const useCartDispatchContext = () => useContext(CartStateContext);

export default CartContextProvider;
