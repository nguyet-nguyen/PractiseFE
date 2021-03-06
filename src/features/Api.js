import {api, apiadmin, apiadminnoFormdata, callApiAdmin} from "../utils/Api";

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

export const requestFilterCategory = (data, page, limit) => {
  try {
      return api.post(`/products/filter?limit=${limit}&page=${page}`, data);
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
// Get count item in shopping cart
// export const getCountItemsInCart = () => {
//   try {
//     return apiadmin.get(`/users/carts/count`);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCountItemsInCart = (token) => {
  try {
    return callApiAdmin(token).get(`/users/carts/count`);
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

// Checkout by PayPal
export const addOrderPayPal = (data) => {
  try {
    return apiadminnoFormdata.post(`/users/orders/payments`, data);
  } catch (error) {
    console.log(error);
  }
};

// Continue to payment by PayPal
export const continueToPayment = (data, id) => {
  try {
    return apiadminnoFormdata.put(`/users/orders/payments/${id}`, data);
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

// Get user order history detail
export const getUserOrderDetail = (id) => {
  try {
    return apiadmin.get(`/users/orders/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// User cancel order for reason
export const cancelOrder = (data, id) => {
  try {
    return apiadminnoFormdata.put(`/users/orders/${id}`, data);
  } catch (error) {
    console.log(error);
  }
}

// Filter order list by ord status id - users ord history
export const filterOrdByStatus = (id) => {
  try {
    return apiadmin.get(`/users/orders/filter?status=${id}`);
  } catch (error) {
    console.log(error);
  }
};

// Buy items in order again
export const buyAgain = (id) => {
  try {
    return apiadmin.get(`/users/orders/${id}/buyAgain`);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------admin----------------------------------
export const getAllUsers = () => {
  try {
    return apiadmin.get(`/admin/users`);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdmins = () => {
  try {
    return apiadmin.get(`/admin/accounts`);
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

export const getAllProductsAdmin = () => {
  try {
    return apiadmin.get(`/admin/products?limit`);
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

export const UpdateProduct = (data, id) => {
  try {
      return apiadmin.post(`/admin/products/${id}`, data);
  } catch (error) {
      console.log(error);
  }
}

export const UpdateProductItems = (data, id) => {
  try {
    return apiadminnoFormdata.put(`/admin/products/${id}/productItem`, data);
  } catch (error) {
    console.log(error);
  }
}

// get all order list
export const getAllOrderListAdmin = () => {
  try {
    return apiadmin.get(`/admin/orders`);
  } catch (error) {
    console.log(error);
  }
}

// update status orders list
export const UpdateStatusOrderList = (data, id) => {
  try {
    return apiadminnoFormdata.put(`/admin/orders/${id}`, data);
  } catch (error) {
    console.log(error);
  }
}

// report
export const getReports = (data) => {
  try {
      return apiadminnoFormdata.post("/admin/reports",data);
  } catch (error) {
      console.log(error);
  }
}

// Get user order history detail - by admin
export const getUserOrderDetailByAdmin = (id) => {
  try {
    return apiadmin.get(`/admin/orders/${id}`);
    
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

// Export invoice file
export const exportInvoiceFile = (id) => {
  try {
    return apiadmin.get(`/admin/orders/${id}/export`);
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


