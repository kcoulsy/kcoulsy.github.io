import React from 'react';
import { shallow } from 'enzyme';

import Icon, { IconType } from './Icon';

const setup = (type: IconType, styles?: string) => {
    return shallow(<Icon icon={type} styles={styles} />);
};

test('should render basket without error', () => {
    const wrapper = setup(IconType.Basket);
    const component = wrapper.find('[data-test="icon-basket"]');

    expect(component.length).toBe(1);
});

test('should render className when passed styles prop for basket', () => {
    const extraStyles = 'testing styles';
    const wrapper = setup(IconType.Basket, extraStyles);
    const component = wrapper.find('[data-test="icon-basket"]');

    expect(component.prop('className')).toBe(extraStyles);
});

test('should render plus without error', () => {
    const wrapper = setup(IconType.Plus);
    const component = wrapper.find('[data-test="icon-plus"]');

    expect(component.length).toBe(1);
});

test('should render className when passed styles prop for plus', () => {
    const extraStyles = 'testing styles';
    const wrapper = setup(IconType.Plus, extraStyles);
    const component = wrapper.find('[data-test="icon-plus"]');

    expect(component.prop('className')).toBe(extraStyles);
});

test('should render minus without error', () => {
    const wrapper = setup(IconType.Minus);
    const component = wrapper.find('[data-test="icon-minus"]');

    expect(component.length).toBe(1);
});

test('should render className when passed styles prop for minus', () => {
    const extraStyles = 'testing styles';
    const wrapper = setup(IconType.Minus, extraStyles);
    const component = wrapper.find('[data-test="icon-minus"]');

    expect(component.prop('className')).toBe(extraStyles);
});

test('should render checkout without error', () => {
    const wrapper = setup(IconType.Checkout);
    const component = wrapper.find('[data-test="icon-checkout"]');

    expect(component.length).toBe(1);
});

test('should render className when passed styles prop for checkout', () => {
    const extraStyles = 'testing styles';
    const wrapper = setup(IconType.Checkout, extraStyles);
    const component = wrapper.find('[data-test="icon-checkout"]');

    expect(component.prop('className')).toBe(extraStyles);
});
