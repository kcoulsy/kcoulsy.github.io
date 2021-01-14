import axios from 'axios';
import moxios from 'moxios';
import * as actions from './actions';
import { Product, ProductColor } from './types';

const testProducts: Product[] = [
    {
        id: 1,
        colour: ProductColor.Black,
        name: 'Black Shoes',
        img: 'imagelink',
        price: 10,
    },
    {
        id: 2,
        colour: ProductColor.Red,
        name: 'Red Shoes',
        img: 'pictureofshoes',
        price: 12,
    },
];

beforeEach(() => {
    jest.spyOn(axios, 'get').mockImplementation(
        jest.fn(() => Promise.resolve({ data: { data: testProducts } })),
    );
});

test('should return an axios request with product list from fetchProduct', async () => {
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: testProducts,
        });
    });
    const response = await actions.fetchProducts();
    expect(response.data).toEqual({ data: testProducts });
});
