import BannerHomepage from "pages/LandingPages/Home/sections/Banner";
import React from "react";
import ReactDOM from "react-dom";
import {act} from 'react-dom/test-utils';


describe("Unit Test banner home Component render", () => {
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
            ReactDOM.render(<BannerHomepage/>, container) 
        }) 
 
        const button = container.querySelector("div")
        expect(button).toMatchSnapshot()
    }) 

})