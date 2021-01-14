import { shallow } from 'enzyme';

import Cart from './Cart';

const setup = () => {
    return shallow(<Cart />);
};

test('should render without error', () => {
    const wrapper = setup();
    const component = wrapper.find('[data-test="page-cart"]');
    expect(component.length).toBe(1);
});

export {};
