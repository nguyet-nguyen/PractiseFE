import React from "react";
import ReactDOM from "react-dom";
import { act } from 'react-dom/test-utils';
import CardProduct from "pages/LandingPages/Home/function/CardProduct";
import { numberFormat } from "pages/LandingPages/Home/function/FormatMoney";

import {
    BrowserRouter,
} from "react-router-dom";

describe("Unit Test CardProduct Component render", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });
    
    it("SnapShot case 1", () => {
        const productList = []

        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(productList)
        })
    );
     act(() => {
        ReactDOM.render(
            <BrowserRouter>
                <CardProduct proList={productList} />
            </BrowserRouter>
            , container)
    });
        expect(container.querySelector('.ProductCard')).toMatchSnapshot();
        expect(container.querySelector('.ProductCard')).toBe(null);
    });
   
    it("SnapShot case 2", async () => {
        const productList = [{
            id: 1,
            name: "MOONLIGHT ANKLE BOOT",
            image: "https://bizweb.dktcdn.net/thumb/large/100/419/519/products/quanonglung.jpg?v=1614139227953",
            category: "Boot",
            price: 500000,
        }];
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(productList)
            })
        );
         act( () => {
            ReactDOM.render(
                <BrowserRouter>
                    <CardProduct proList={productList} />
                </BrowserRouter>
                , container)
        });
        expect(container.querySelector('.ProductCard')).toMatchSnapshot();
        expect(container.querySelector(".productName").textContent).toBe('MOONLIGHT ANKLE BOOT');
        expect(container.querySelector(".productPrice").textContent).toBe(numberFormat(500000));

    })
    

})