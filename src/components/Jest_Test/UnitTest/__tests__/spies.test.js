import additionFn from '../additionFn';
import { add, getNumber, callApis } from '../spies.js';
import { faker } from "@faker-js/faker";

jest.mock('../additionFn')

describe("Jest Unit Test describe simple", () => {

    test("Test spies.js", () => {
        const spyOn = jest.spyOn(additionFn, 'getNumber').mockImplementation(() => 3);
        
        expect(add(2)).toBe(5)
        spyOn.mockRestore();
    })

    it("Test Asynchonous APIs",

        async () => {
            let id = faker.datatype.number();
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            let email = faker.internet.email();
            let phoneNumber = faker.phone.phoneNumber();
            let city = faker.city;
            let country = faker.country;
            let spyOn = jest.spyOn(additionFn, 'fetchExternal').mockResolvedValueOnce(
                [
                    {
                        "id": id,
                        "firstName": firstName,
                        "lastName": lastName,
                        "email": email,
                        "phone": phoneNumber,
                        "city": city,
                        "country": country
                    }
                ]
            );

            // eslint-disable-next-line jest/valid-expect-in-promise
            await callApis()
                .then(data => {
                    expect(data.length).toBe(1);
                    expect(data[0].id).toEqual(id);
                    expect(data[0].firstName).toEqual(firstName);
                    expect(data[0].lastName).toEqual(lastName);
                    expect(data[0].email).toEqual(email);
                    expect(data[0].phone).toEqual(phoneNumber);
                })

            spyOn.mockRestore();
        })
})