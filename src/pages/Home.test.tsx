import * as React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';

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
    const setState = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (initState: any) => [initState, setState];

    beforeEach(() => {
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        jest.spyOn(axios, 'get').mockImplementation(
            jest.fn(() => Promise.resolve({ data: [] })),
        );
    });

    test('should call api and update state with products', async () => {
        await mount(<Home />);
        expect(setState).toHaveBeenCalledTimes(1);
    });
});
