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
        const mockUseCartStateContext = jest.fn(() => ({
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
        }));
        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            mockUseCartStateContext,
        );

        const wrapper = setup();
        const el = wrapper.find('[data-test="navbar-link-cart"]');

        expect(el.text()).toContain('Cart');
    });

    test('should show qty of items in cart on the cart link if > 0', () => {
        /**
         * In this case, since totalQuantity is computed in state,
         *  we don't care that there are no items returned, only the totalQuantity
         */
        const mockUseCartStateContext = jest.fn(() => ({
            items: [],
            totalQuantity: 10,
            totalPrice: 0,
        }));

        jest.spyOn(CartContextModule, 'useCartStateContext').mockImplementation(
            mockUseCartStateContext,
        );

        const wrapper = setup();
        const el = wrapper.find('[data-test="navbar-link-cart"]');

        expect(el.text()).toContain('Cart (10)');
    });
});
