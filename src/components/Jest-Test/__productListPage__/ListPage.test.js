import React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';
import ListPage from "pages/LandingPages/ProductListPage/sections/ListPage";
import {
    BrowserRouter,
} from "react-router-dom";
describe("Jest Unit Test ListPage productListPage", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    })

    it("SnapShot case 1", () => {
        act(() => {
            ReactDOM.render(
                <BrowserRouter>
                    <ListPage />
                </BrowserRouter>
                , container)
        });
        let categoryHome = container.querySelector('#listPage-productList');
        expect(categoryHome).toMatchSnapshot();
    });
})