
import axios from 'axios';
import {api} from "../utils/Api";
const Api = async (url) => {
  return await axios
    .get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export default Api;

export const getAllProducts = () => {
    try {
        return api.get('/products');
    }
    catch (error) {
        console.log(error);

    }
}
export const getAllCategory = () => {
  try {
      return api.get('/categories');
  }
  catch (error) {
      console.log(error);

  }
}


export const requestFilterCategory = (data) => {
  try {
      return api.post('/products/search', data);
  }
  catch (error) {
      console.log(error);

  }
}

