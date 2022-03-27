import Category from "pages/LandingPages/Home/sections/Category";
import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';

describe("Unit Test category render", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Unit Test category items render",  () => {
        

        act(() => {
            ReactDOM.render(<Category/>, container)
        })

        const button = container.querySelector('section');
        expect(button).toMatchSnapshot()
    })
})