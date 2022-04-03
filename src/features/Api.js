
import {api} from "../utils/Api";

// ---------------users------------------------?
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

export const SignUpApi = (data) => {
    try {
        return api.post(`/register`, data);
    } catch (error) {
        console.log(error);
    }
}

export const SignInApiToken = (data) => {
    try {
        return api.post(`/login`, data);
    } catch (error) {
        console.log(error);
    }
}

export const SignInApiRole = (data) => {
    try {
        return api.post(`/users/email`, data);
    } catch (error) {
        console.log(error);
    }
}

// ----------------------admin----------------------------------
export const getAllUsers = () => {
    try {
        return api.get('/users');
    }
    catch (error) {
        console.log(error);

    }
}