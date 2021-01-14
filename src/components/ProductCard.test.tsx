import React from 'react';
import { shallow } from 'enzyme';

import ProductCard from './ProductCard';
import { Product, ProductColor } from './../types';

const testProduct: Product = {
    id: 1,
    colour: ProductColor.Black,
    name: 'Black Shoes',
    img: 'imagelink',
    price: 10,
};

const setup = () => {
    return shallow(<ProductCard product={testProduct} />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-productcard"]');
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
