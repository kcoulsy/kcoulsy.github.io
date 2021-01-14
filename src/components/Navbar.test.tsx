import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';
import * as CartContextModule from '../contexts/cart';

const setup = () => {
    return shallow(<Navbar />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-navbar"]');
    expect(component.length).toBe(1);
});

test('should contain a link to the homepage', () => {
    const wrapper = setup();
    const el = wrapper.find('[data-test="navbar-link-home"]');

    expect(el.length).toBe(1);

    const props = el.props();
    expect(props.to).toBe(PATH_HOME);
});

test('should contain a link to the cart', () => {
    const wrapper = setup();
    const el = wrapper.find('[data-test="navbar-link-cart"]');

    expect(el.length).toBe(1);

    const props = el.props();
    expect(props.to).toBe(PATH_CART);
});

describe('cart quantity', () => {
    test('should not show qty of items in cart on the cart link 0', () => {
        const mockUseCartStateContext = jest.fn(() => []);
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            mockUseCartStateContext,
        );

        const wrapper = setup();
        const el = wrapper.find('[data-test="navbar-link-cart"]');

        expect(el.text()).toContain('Cart');
    });

    test('should show qty of items in cart on the cart link if > 0', () => {
        const mockUseCartStateContext = jest.fn(() => [
            {
                productId: 1,
                quantity: 1,
            },
        ]);
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            mockUseCartStateContext,
        );

        const wrapper = setup();
        const el = wrapper.find('[data-test="navbar-link-cart"]');

        expect(el.text()).toContain('1)');
    });

    test('should contain number of all of quantities of each item added together', () => {
        const mockUseCartStateContext = jest.fn(() => [
            {
                productId: 1,
                quantity: 10,
            },
            {
                productId: 2,
                quantity: 3,
            },
        ]);
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            mockUseCartStateContext,
        );

        const wrapper = setup();
        const el = wrapper.find('[data-test="navbar-link-cart"]');

        expect(el.text()).toContain('13');
    });
});
