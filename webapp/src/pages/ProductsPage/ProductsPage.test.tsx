import React from "react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {PRODUCTS_URL} from "../ApiHelper";
import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
    it("shouldDisplayLoadingSpinner", () => {
        render(
            <MemoryRouter>
                <ProductsPage/>
            </MemoryRouter>
        );
        expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
    });
    it("shouldDisplayProducts", async () => {
        // set up mock for axios.get
        const response = {
            data: [
                {
                    ProductID: 1,
                    ProductName: "Hat",
                    ProductPhotoURL: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ProductStatus: "Active"
                }
            ],
            message: ""
        };
        const server = setupServer(
            rest.get(PRODUCTS_URL, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(response));
            })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId(`products-container`)).toBeInTheDocument();
        });
        server.close();
    });
    it("shouldDisplayErrorMessage", async () => {
        // set up mock for axios.get
        const response = {
            data: [],
            message: "Error"
        };
        const server = setupServer(
            rest.get(PRODUCTS_URL, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json(response));
            })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
        });
        server.close();
    });
});