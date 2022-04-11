import {numberFormat} from "../../../pages/LandingPages/Home/function/FormatMoney";

describe("Jest Unit Test formatmoney", () => {

    it("Test mock function formatmoney", () => {

        const testFortmat = numberFormat(200)
        expect(testFortmat).toBe("$200.00");
    })
})