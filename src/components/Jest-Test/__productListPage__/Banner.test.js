
import BannerProductList from "pages/LandingPages/ProductListPage/sections/Banner";
import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';


describe("Unit Test banner product list page Component render", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("SnapShot case 1",  () => {
 
        act(() => { 
            ReactDOM.render(<BannerProductList/>, container) 
        }) 
 
        const button = container.querySelector("div")
        expect(button).toMatchSnapshot()
    }) 

})