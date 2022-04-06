import { api, apiadmin } from "../utils/Api";

// ---------------users------------------------?
export const getAllProducts = () => {
  try {
    return api.get("/products");
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategory = () => {
  try {
    return api.get("/categories");
  } catch (error) {
    console.log(error);
  }
};

export const requestFilterCategory = (data) => {
  try {
    return api.post("/products/filter", data);
  } catch (error) {
    console.log(error);
  }
};

export const SignUpApi = (data) => {
  try {
    return api.post(`/register`, data);
  } catch (error) {
    console.log(error);
  }
};

export const SignInApiToken = (data) => {
  try {
    return api.post(`/login`, data);
  } catch (error) {
    console.log(error);
  }
};

export const SignInApiRole = (data) => {
  try {
    return api.post(`/users/email`, data);
  } catch (error) {
    console.log(error);
  }
};
// product detail
export const getProductDetail = (id) => {
  try {
    return api.get(`/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// Add To Cart
export const addToCart = (data) => {
  try {
    return apiadmin.post(`/users/carts`, data);
  } catch (error) {
    console.log(error);
  }
};

// Get all items in cart by user
export const getAllItemsInCart = () => {
  try {
    return apiadmin.get(`/users/carts`);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------admin----------------------------------
export const getAllUsers = () => {
  try {
    return apiadmin.get("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
// create user
export const CreateUsers = (data) => {
  try {
    return apiadmin.post("/admin/users", data);
  } catch (error) {
    console.log(error);
  }
};

// add product
export const CreateProducts = (data) => {
  try {
    return apiadmin.post('/admin/products', data);
  } catch (error) {
    console.log(error);
  }
}

// ---------------------- for user and admin ----------------------------------

// Validate Email (check if email exists)
export const checkIfEmailExists = (data) => {
  try {
    return api.post("/users/check_email", data);
  } catch (error) {
    console.log(error);
  }
};

// Get User Info By Id 
export const getUserInfo = (id) => {
  try {
    return apiadmin.get(`/users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// Update User Info By Id
export const updateUserInfo = (id, data) => {
  try {
    return apiadmin.put(`/users/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

// Update User Profile Avatar By Id
export const updateUserAvatar = (id, data) => {
  try {
    return apiadmin.post(`/users/${id}/image`, data);
  } catch (error) {
    console.log(error);
  }
};

