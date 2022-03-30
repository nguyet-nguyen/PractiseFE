import React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';
import Category from "pages/LandingPages/Home/sections/Category";
import {
    BrowserRouter,
} from "react-router-dom";
describe("Unit Test category homepage Component render", () => {
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
        const categoryList = []
        act(async () => {
            ReactDOM.render(
                <BrowserRouter>
                    <Category />
                </BrowserRouter>
                , container)
        });
        let categoryHome = container.querySelector('#categoryHome');
        expect(categoryHome.querySelector('.product-desc').textContent).toBe('All products are warranted for 12 months');
        expect(categoryHome).toMatchSnapshot();
    });

    it("SnapShot case 2", async () => {
        const categoryList = [{
            id: 2,
            name: "Pan",
            image: "https://bizweb.dktcdn.net/thumb/large/100/419/519/products/quanonglung.jpg?v=1614139227953",
        }];

        act(async () => {
            ReactDOM.render(
                <BrowserRouter>
                    <Category />
                </BrowserRouter>
                , container)
        });

        let categoryHome = container.querySelector('#categoryHome');
        // expect(container.querySelector(".categoryName").textContent).toBe('Pan');
        expect(categoryHome).toMatchSnapshot();

    })

})