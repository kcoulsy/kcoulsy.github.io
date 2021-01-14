import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';
import { PATH_CART, PATH_HOME } from './../constants/pageRoutes';

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

test('should contain an input for searching', () => {
    const wrapper = setup();
    const el = wrapper.find('[data-test="navbar-search"]');
    expect(el.length).toBe(1);
});
