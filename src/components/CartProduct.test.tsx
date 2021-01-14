import { shallow } from 'enzyme';

import CartProduct from './CartProduct';
import * as CartContextModule from '../contexts/cart';

const testProduct = {
    productId: 1,
    quantity: 5,
};

const setup = () => {
    return shallow(
        <CartProduct
            productId={testProduct.productId}
            quantity={testProduct.quantity}
        />,
    );
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-cartproduct"]');
    expect(component.length).toBe(1);
});

test('should display product name', () => {});

test('should fetch product details', () => {});

describe('product quantity', () => {
    test('should display product quantity', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-quantity"]');
        expect(el.text()).toBe(testProduct.quantity.toString());
    });

    test('should display product increment button', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-qty-inc"]');
        expect(el.length).toBe(1);
    });

    test('should display product decrement button', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-qty-dec"]');
        expect(el.length).toBe(1);
    });

    test('should dispatch quanity update on incrementing', () => {
        const mockUseCartDispatchContext = jest.fn();
        jest.spyOn(
            CartContextModule,
            'useCartDispatchContext',
        ).mockImplementation(() => mockUseCartDispatchContext);

        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-qty-inc"]');
        el.simulate('click', { preventDefault() {} });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.UpdateQuantity,
            payload: {
                productId: testProduct.productId,
                quantity: testProduct.quantity + 1,
            },
        });
    });

    test('should dispatch quanity update on decrementing', () => {
        // TODO stop repeating these, stick it at top of describe and clear afterEach
        const mockUseCartDispatchContext = jest.fn();
        jest.spyOn(
            CartContextModule,
            'useCartDispatchContext',
        ).mockImplementation(() => mockUseCartDispatchContext);

        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-qty-dec"]');
        el.simulate('click', { preventDefault() {} });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.UpdateQuantity,
            payload: {
                productId: testProduct.productId,
                quantity: testProduct.quantity - 1,
            },
        });
    });

    test('should dispatch remove on decrementing when quantity is 1', () => {
        const testProductWithSingleQty = {
            productId: 1,
            quantity: 1,
        };
        const mockUseCartDispatchContext = jest.fn();
        jest.spyOn(
            CartContextModule,
            'useCartDispatchContext',
        ).mockImplementation(() => mockUseCartDispatchContext);

        const wrapper = shallow(
            <CartProduct
                productId={testProductWithSingleQty.productId}
                quantity={testProductWithSingleQty.quantity}
            />,
        );
        const el = wrapper.find('[data-test="cartproduct-qty-dec"]');
        el.simulate('click', { preventDefault() {} });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.RemoveFromCart,
            payload: {
                productId: testProduct.productId,
            },
        });
    });
});

describe('remove product button', () => {
    test('should display remove product button', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-removebutton"]');
        expect(el.length).toBe(1);
    });

    test('should dispatch remove product when clicked', () => {
        const mockUseCartDispatchContext = jest.fn();
        jest.spyOn(
            CartContextModule,
            'useCartDispatchContext',
        ).mockImplementation(() => mockUseCartDispatchContext);

        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-removebutton"]');
        el.simulate('click', { preventDefault() {} });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.RemoveFromCart,
            payload: {
                productId: testProduct.productId,
            },
        });
    });
});

export {};
