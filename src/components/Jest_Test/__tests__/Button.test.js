import React from "react";
import ReactDOM from "react-dom";
import { faker } from "@faker-js/faker";
import render from 'react-test-renderer';
import {act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';


describe("Unit Test Component render", () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container = null;
    })

    it("Button component rendering testing",  () => {
        let name = faker.name.firstName() + ' ' + faker.name.lastName()

        act(() => {
            ReactDOM.render(<Button newName={name} />, container)
        })

        const button = container.querySelector('button')
        expect(button.textContent).toBe('Click Me')

        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        })

        expect(button.textContent).toBe('Click ' + name)
    })

 

})