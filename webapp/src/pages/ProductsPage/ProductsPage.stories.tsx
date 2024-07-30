import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';
import ProductsPage from './ProductsPage';
import {PRODUCTS_URL} from '../ApiHelper';

export default {
    title: 'Products Page',
    component: ProductsPage,
    decorators: [(Story) => (
        <MemoryRouter>
            <Story/>
        </MemoryRouter>
    )],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage/>;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [
                    {
                        "ProductID": 1,
                        "ProductName": "Product 1",
                        "ProductPhotoURL": "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        "ProductID": 2,
                        "ProductName": "Product 2",
                        "ProductPhotoURL": "https://plus.unsplash.com/premium_photo-1671030274122-b6ac34f87b8b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                ],
                message: ""
            },
        }
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [],
                message: ""
            },
        }
    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: 'GET',
            status: 500,
            response: {
                data: [],
                message: "Error"
            }
        }
    ],
};