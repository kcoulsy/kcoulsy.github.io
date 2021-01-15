import { shallow } from 'enzyme';

import CartProduct from './CartProduct';
import * as CartContextModule from '../contexts/cart';
import { ProductColor } from '../types';

const testProduct = {
    id: 1,
    name: 'test product',
    img: 'srclink',
    colour: ProductColor.Red,
    price: 10,
};

const testCartProduct = {
    product: testProduct,
    quantity: 5,
};

const setup = () => {
    return shallow(
        <CartProduct
            product={testProduct}
            quantity={testCartProduct.quantity}
        />,
    );
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-cartproduct"]');
    expect(component.length).toBe(1);
});

test('should contain an img with products src', () => {
    const wrapper = setup();
    const el = wrapper.find('[data-test="productcard-image"]');
    const props = el.props();
    expect(props.src).toBe(testProduct.img);
});

test('should contain product name', () => {
    const wrapper = setup();
    expect(wrapper.text()).toContain(testProduct.name);
});

test('should contain product price', () => {
    const wrapper = setup();
    expect(wrapper.text()).toContain(testProduct.price);
});

test('should contain product colour', () => {
    const wrapper = setup();
    expect(wrapper.text()).toContain(testProduct.colour);
});

describe('product quantity', () => {
    test('should display product quantity', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cartproduct-qty-input"]');
        expect(el.prop('value')).toBe(testCartProduct.quantity);
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
        const el = wrapper.find('[data-test="cartproduct-qty-input"]');
        el.simulate('change', { target: { value: 10 } });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.UpdateQuantity,
            payload: {
                id: testCartProduct.product.id,
                quantity: 10,
            },
        });
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
                id: testCartProduct.product.id,
                quantity: testCartProduct.quantity + 1,
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
                id: testCartProduct.product.id,
                quantity: testCartProduct.quantity - 1,
            },
        });
    });

    test('should dispatch remove on decrementing when quantity is 1', () => {
        const testCartProductWithSingleQty = {
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
                product={testProduct}
                quantity={testCartProductWithSingleQty.quantity}
            />,
        );
        const el = wrapper.find('[data-test="cartproduct-qty-dec"]');
        el.simulate('click', { preventDefault() {} });

        expect(mockUseCartDispatchContext).toHaveBeenCalledTimes(1);
        expect(mockUseCartDispatchContext).toHaveBeenCalledWith({
            type: CartContextModule.CartActionType.RemoveFromCart,
            payload: {
                id: testCartProduct.product.id,
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
                id: testCartProduct.product.id,
            },
        });
    });
});

export {};
