import React from 'react';
import { shallow } from 'enzyme';

import Filter from './Filter';
import { ProductColor } from '../types';

const mockOnSelect = jest.fn();

const setup = () => {
    return shallow(<Filter onSelect={mockOnSelect} />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="component-filter"]');

    expect(component.length).toBe(1);
});

test('should render all options of ProductColor', () => {
    const options = Object.values(ProductColor);
    const wrapper = setup();
    const optionEls = wrapper.find('[data-test="filter-option"]');

    expect(optionEls.length).toBe(options.length);
});

test('selecting an option should call onSelect', () => {
    const wrapper = setup();
    const selectEl = wrapper.find('[data-test="filter-select"]');

    selectEl.simulate('change', { target: { value: ProductColor.Black } });

    expect(mockOnSelect).toHaveBeenCalledWith(ProductColor.Black);
});
