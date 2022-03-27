import React from "react";
import render from 'react-test-renderer';
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;
import Button from '../Button.js';

describe("Unit Test Component render", () => {
    it("Button component rendering",  () => {
        const button = render.create(
            <Button newName='Lan Anh' />,
        );
        let tree = button.toJSON();
        expect(tree).toMatchSnapshot();

        act(() => {
            /* fire events that update state */
            tree.props.onClick();
        })
        tree = button.toJSON();
        expect(tree).toMatchSnapshot();
    })
})