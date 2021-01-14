import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

const setup = () => {
    return shallow(<Home />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="page-home"]');
    expect(component.length).toBe(1);
});

describe('fetching products from api', () => {
    test('should call api on app load', () => {});

    test('should update products state with returned products', () => {});
});
