import { faker } from "@faker-js/faker";
import axios from 'axios';
const URL = 'http://localhost:3000/todo/get';

const additionFn = {
    getNumber: () => {
        return Math.round(100)
    },
    getFirstName: () => {
        return faker.name.firstName()
    },
    fetchExternal: () => axios.get(URL)
        .then(data => {
            if (data.status >= 200 && data.status <= 200) return data.data;

            throw new Error('Data could not be retrieved.');
        }),
}

export default additionFn