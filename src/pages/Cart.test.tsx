import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Cart from './Cart';
import * as CartContextModule from '../contexts/cart';
import { ProductColor } from '../types';

const setup = () => {
    return shallow(<Cart />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="page-cart"]');
    expect(component.length).toBe(1);
});

describe('if items === 0', () => {
    beforeEach(() => {
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            () => ({
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            }),
        );
    });

    test('should show no items message', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cart-no-items"]');

        expect(el.length).toBe(1);
    });

    test('should show link back to home', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cart-link-home"]');

        expect(el.length).toBe(1);
    });

    test('should not render any products', () => {
        const wrapper = mount(
            <Router>
                <Cart />
            </Router>,
        );
        const el = wrapper.find('[data-test="component-cartproduct"]');

        expect(el.length).toBe(0);
    });
});

describe('if items > 0', () => {
    beforeEach(() => {
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            () => ({
                items: [
                    {
                        product: {
                            id: 1,
                            name: 'test',
                            colour: ProductColor.Stone,
                            img: 'link',
                            price: 10,
                        },
                        quantity: 1,
                    },
                    {
                        product: {
                            id: 2,
                            name: 'test',
                            colour: ProductColor.Stone,
                            img: 'link',
                            price: 10,
                        },
                        quantity: 1,
                    },
                ],
                totalQuantity: 2,
                totalPrice: 20,
            }),
        );
    });

    test('should not show no items message', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cart-no-items"]');

        expect(el.length).toBe(0);
    });

    test('should not show link back to home', () => {
        const wrapper = setup();
        const el = wrapper.find('[data-test="cart-link-home"]');

        expect(el.length).toBe(0);
    });

    test('should render products', () => {
        const wrapper = mount(<Cart />);
        const el = wrapper.find('[data-test="component-cartproduct"]');

        expect(el.length).toBe(2);
    });
});
export {};
