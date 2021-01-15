import { mount } from 'enzyme';
import React from 'react';
import { ProductColor } from '../types';
import CartContextProvider, {
    cartReducer,
    CartItem,
    CartAction,
    CartActionType,
    useCartStateContext,
    useCartDispatchContext,
} from './cart';

const testProduct = {
    id: 1,
    name: 'test product',
    img: 'srclink',
    colour: ProductColor.Red,
    price: 10,
};

describe('testing cartReducer', () => {
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
});

describe('testing contexts', () => {
    const TestingCompnent: React.FC<{ dispatchValues?: CartAction[] }> = ({
        dispatchValues,
    }) => {
        const state = useCartStateContext();
        const dispatch = useCartDispatchContext();

        return (
            <>
                {dispatchValues?.map((dispatchValue) => {
                    return (
                        <button
                            key={dispatchValue.type}
                            data-test="update-state"
                            onClick={() => {
                                if (dispatchValue) dispatch(dispatchValue);
                            }}
                        ></button>
                    );
                })}
                <div data-test="state-value">{JSON.stringify(state)}</div>
            </>
        );
    };
    const setup = (dispatchValues?: CartAction[]) => {
        return mount(
            <CartContextProvider>
                <TestingCompnent dispatchValues={dispatchValues} />
            </CartContextProvider>,
        );
    };

    test('empty state', () => {
        const wrapper = setup();
        const stateValue = wrapper.find('[data-test="state-value"]').text();
        expect(JSON.parse(stateValue)).toEqual({
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
        });
    });

    test('adding an item', () => {
        const dispatchAction: CartAction = {
            type: CartActionType.AddToCart,
            payload: {
                id: 1,
                name: 'test',
                colour: ProductColor.Red,
                price: 10,
                img: 'src',
            },
        };
        const wrapper = setup([dispatchAction]);
        const button = wrapper.find('[data-test="update-state"]');

        button.simulate('click');

        const stateValue = wrapper.find('[data-test="state-value"]').text();

        expect(JSON.parse(stateValue)).toEqual({
            items: [{ product: dispatchAction.payload, quantity: 1 }],
            totalQuantity: 1,
            totalPrice: dispatchAction.payload.price,
        });
    });

    test('adding an item that already exists', () => {
        const dispatchAction: CartAction = {
            type: CartActionType.AddToCart,
            payload: {
                id: 1,
                name: 'test',
                colour: ProductColor.Red,
                price: 10,
                img: 'src',
            },
        };
        const wrapper = setup([dispatchAction]);
        const button = wrapper.find('[data-test="update-state"]');

        button.simulate('click');
        // click a second time for a second dispatch
        button.simulate('click');

        const stateValue = wrapper.find('[data-test="state-value"]').text();
        expect(JSON.parse(stateValue)).toEqual({
            items: [{ product: dispatchAction.payload, quantity: 2 }],
            totalQuantity: 2,
            totalPrice: dispatchAction.payload.price,
        });
    });

    test('updating an items quantity', () => {
        const dispatchAddAction: CartAction = {
            type: CartActionType.AddToCart,
            payload: {
                id: 1,
                name: 'test',
                colour: ProductColor.Red,
                price: 10,
                img: 'src',
            },
        };
        const dispatchUpdateAction: CartAction = {
            type: CartActionType.UpdateQuantity,
            payload: {
                id: dispatchAddAction.payload.id,
                quantity: 10,
            },
        };
        const wrapper = setup([dispatchAddAction, dispatchUpdateAction]);
        const button = wrapper.find('[data-test="update-state"]');

        // setting up initial state - so there is something to update
        button.at(0).simulate('click');

        button.at(1).simulate('click');

        const stateValue = wrapper.find('[data-test="state-value"]').text();
        expect(JSON.parse(stateValue)).toEqual({
            items: [{ product: dispatchAddAction.payload, quantity: 10 }],
            totalQuantity: 10,
            totalPrice: dispatchAddAction.payload.price,
        });
    });

    test('deleting an item', () => {
        const dispatchAddAction: CartAction = {
            type: CartActionType.AddToCart,
            payload: {
                id: 1,
                name: 'test',
                colour: ProductColor.Red,
                price: 10,
                img: 'src',
            },
        };
        const dispatchUpdateAction: CartAction = {
            type: CartActionType.RemoveFromCart,
            payload: {
                id: dispatchAddAction.payload.id,
            },
        };
        const wrapper = setup([dispatchAddAction, dispatchUpdateAction]);
        const button = wrapper.find('[data-test="update-state"]');

        // setting up initial state - so there is something to update
        button.at(0).simulate('click');

        button.at(1).simulate('click');

        const stateValue = wrapper.find('[data-test="state-value"]').text();
        expect(JSON.parse(stateValue)).toEqual({
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
        });
    });
});
export {};
