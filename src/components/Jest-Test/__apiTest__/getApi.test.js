// import { getAllProducts } from "features/Api";
// import { faker } from "@faker-js/faker";
// import ProductList from "pages/LandingPages/Home/sections/ProductList";
// jest.mock("features/Api")
// describe("Jest Unit Test describe simple", () => {

//     it("Test Asynchonous APIs",

//         async () => {
//             let id = faker.datatype.number();
//             let name = faker.name;
//             let image = faker.image;
//             let category = faker.category
//             let price = faker.price; 
//             let spyOn = jest.spyOn(getAllProducts,'ProductList').mockResolvedValueOnce(
//                 [
//                     {
//                         "id": id,
//                         "name": name,
//                         "image": image,
//                         "category": category,
//                         "price": price,
//                     }
//                 ]
//             );

//             // eslint-disable-next-line jest/valid-expect-in-promise
//             await callApis()
//                 .then(data => {
                    
//                     expect(data[0].id).toEqual(id);
//                     expect(data[0].name).toEqual(name);
//                     expect(data[0].image).toEqual(image);
//                     expect(data[0].category).toEqual(category);
//                     expect(data[0].price).toEqual(price);
//                 })

//             spyOn.mockRestore();
//         })
// })