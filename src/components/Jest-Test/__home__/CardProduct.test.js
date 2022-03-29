import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';
import CardProduct from "pages/LandingPages/Home/function/CardProduct";


describe("Unit Test CardProduct Component render", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })
    // it("SnapShot case 1",  () => {
    //     const productList = []
 
    //     act(() => { 
    //         ReactDOM.render(<CardProduct productList={productList}/>, container) 
    //     }) 
 
    //     const card = container.querySelector()
    //     expect(card).toBe(null)
    //     expect(card).toMatchSnapshot()
    // }) 
    it("SnapShot case 2",  () => {
        const productList = [
            {
                id: 1,
                name: "MOONLIGHT ANKLE BOOT",
                image: "https://bizweb.dktcdn.net/thumb/large/100/419/519/products/quanonglung.jpg?v=1614139227953",
                category: "Boot",
                price: 500000,
            },
            {
                id: 2,
                name: "MOONLIGHT ANKLE BOOT",
                image: "https://bizweb.dktcdn.net/thumb/large/100/419/519/products/quanonglung.jpg?v=1614139227953",
                category: "Shirt",
                price: 400000,
            }
        ]
 
        act(() => { 
            ReactDOM.render(<CardProduct proList={productList}/>, container) 
        }) 
 
        const button = container.querySelector("#ProductCard")
        expect(button).toMatchSnapshot()
    }) 

})