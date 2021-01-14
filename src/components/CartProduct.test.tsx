import { shallow } from 'enzyme';

import CartProduct from './CartProduct';
import * as CartContextModule from '../contexts/cart';

const testProduct = {
    productId: 1,
    quantity: 1,
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

describe('product quanitity', () => {
    test('should display product quantity', () => {});
    test('should display product increment button', () => {});
    test('should display product decrement button', () => {});
    test('should dispatch quanity update on change', () => {});
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
