import additionFn from '../additionFn';
import { add, getName } from '../mocks.js';
jest.mock('../additionFn')

describe("Jest Unit Test describe simple", () => {

    test("Test mocks.js", () => {
        let a = add(2)

        expect(additionFn.getNumber).toHaveBeenCalled()
    })

    it("Test mock function getName", () => {
        getName('Hello ');

        expect(additionFn.getFirstName).toHaveBeenCalled()
    })
})