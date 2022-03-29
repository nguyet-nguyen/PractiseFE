
import {api} from "../utils/Api";


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
      return api.post('/products/filter', data);
  }
  catch (error) {
      console.log(error);

  }
}

