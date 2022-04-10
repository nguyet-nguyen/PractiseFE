import {api, apiadmin, apiadminnoFormdata} from "../utils/Api";

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
// get hot deal
export const getProductHotDeal = () => {
  try {
    return api.get("/bestSelling");
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

// Remove item from shopping cart
export const removeItemFromCart = (id) => {
  try {
    return apiadmin.delete(`/users/carts/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// Update quantity in shopping cart by cart id
export const updateCart = (id, data) => {
  try {
    return apiadmin.put(`/users/carts/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

// Checkout
export const addOrder = (data) => {
  try {
    return apiadminnoFormdata.post(`/users/orders`, data);
  } catch (error) {
    console.log(error);
  }
};

// Users order history
export const getUsersOrdHistory = () => {
  try {
    return apiadmin.get(`/users/orders`);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------admin----------------------------------
export const getAllUsers = (page,limit) => {
  try {
    return apiadmin.get(`/admin/users?limit=${limit}&page=${page}`);
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

export const getAllProductsAdmin = (page,limit) => {
  try {
    return apiadmin.get(`/admin/products?limit=${limit}&page=${page}`);
  } catch (error) {
    console.log(error);
  }
}

export const DeleteProduct = (id) => {
  try {
    return apiadmin.delete(`/admin/products/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export const UpdateProduct = (data,id) => {
  try {
    return apiadmin.post(`/admin/products/${id}`, data);
  } catch (error) {
    console.log(error);
  }
}
export const UpdateProductItems = (data,id) => {
  try {
    return apiadminnoFormdata.put(`/admin/products/${id}/productItem`, data);
  } catch (error) {
    console.log(error);
  }
}

// get all order list
export const getAllOrderListAdmin = (page,limit) => {
  try {
    return apiadmin.get(`/admin/orders?limit=${limit}&page=${page}`);
  } catch (error) {
    console.log(error);
  }
}
// update status orders list
export const UpdateStatusOrderList = (data,id) => {
  try {
    return apiadminnoFormdata.put(`/admin/orders/${id}`, data);
  } catch (error) {
    console.log(error);
  }
}
// report
export const getReports = () => {
  try {
    return apiadmin.get("/admin/reports");
  } catch (error) {
    console.log(error);
  }
};
// report chart
export const getReportsChart = () => {
  try {
    return apiadmin.get("/admin/reports/chart");
  } catch (error) {
    console.log(error);
  }
};
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

