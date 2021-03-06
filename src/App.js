// react-router components
import {Routes, Route, BrowserRouter} from "react-router-dom";

// @mui material components
import {ThemeProvider} from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";
import { ToastContainer } from "react-toastify";

import ProductDetail from "pages/LandingPages/ProductDetail";
import SignUp from "pages/LandingPages/SignUp";
import SignIn from "layouts/pages/authentication/sign-in";

import ProductsPage from "layouts/pages/admin/products";
import UsersPage from "layouts/pages/admin/users";
import DashboardPage from "layouts/pages/admin/dashboard";
import SignUpAdmin from "./pages/Admin/SignUp";
import PrivateRoute from "./pages/PrivateRoute";
import AddProductForm from "./pages/Admin/Products/sections/AddProductForm";
import SignInAdmin from "./pages/Admin/SignIn";
import UpdateProductForm from "./pages/Admin/Products/sections/UpdateProductForm";
import ShoppingCart from "pages/LandingPages/ShoppingCart";
import AdminProfile from "./pages/Admin/AdminProfile";

import Checkout from "pages/LandingPages/Checkout";
import PrivateRouteUser from "pages/PrivateRouteUser";
import OrderDetail from "pages/LandingPages/OrderDetail";
import OrderListAdmin from "./pages/Admin/OrderListAdmin";
import OrderDetailAdmin from "pages/Admin/OrderListAdmin/sections/OrderDetail";
import UserProfile from "./pages/LandingPages/UserProfile";
import AdminTable from "./pages/Admin/Users/sections/AdminTable";
import Admins from "./pages/Admin/Users/index-admin";
import NotFound from "pages/NotFound";

export default function App() {

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }
            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key}/>;
            }
            return null;
        });

    return (

            <ThemeProvider theme={theme}>
                {/*<BrowserRouter>*/}
                <Routes>
                    {/* User Page */}
                    {getRoutes(routes)}
                    <Route exact path="/all-items/item-detail/:id" element={<ProductDetail/>}/>
                    <Route
                        path="/pages/authentication/sign-in"
                        element={
                            <SignIn/>
                        }
                    />
                    <Route
                        path="/pages/authentication/sign-up"
                        element={
                            <SignUp/>
                        }
                    />
                    <Route
                        path="/shopping-cart"
                        element={
                            <PrivateRouteUser>
                                <ShoppingCart/>
                            </PrivateRouteUser>
                        }
                    />
                    <Route
                        path="/user-profile"
                        element={
                            <PrivateRouteUser>
                                <UserProfile />
                            </PrivateRouteUser>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRouteUser>
                                <Checkout/>
                            </PrivateRouteUser>
                        }
                    />
                     <Route
                        path="/order-detail/:id"
                        element={
                            <PrivateRouteUser>
                                <OrderDetail/>
                            </PrivateRouteUser>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage/>
                            </PrivateRoute>
                        }>
                        {/*<Route path="" element={<ProductsTable/>}/>*/}
                        {/*<Route path="add-product" element={<AddProductForm/>}/>*/}
                    </Route>
                    <Route
                        path="/admin/sign-up"
                        element={
                            <PrivateRoute>
                                <SignUpAdmin/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/profile"
                        element={
                                <AdminProfile/>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            <PrivateRoute>
                                <ProductsPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/orders-list"
                        element={
                            <PrivateRoute>
                                <OrderListAdmin/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/orders-list/order-detail/:id"
                        element={
                            <PrivateRoute>
                                <OrderDetailAdmin />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/products/add-product"
                        element={
                            <PrivateRoute>
                                <AddProductForm/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/products/update-product/:id"
                        element={
                            <PrivateRoute>
                                <UpdateProductForm/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/users-list/admin"
                        element={
                            <PrivateRoute>
                                <Admins/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/users-list/buyer"
                        element={
                            <PrivateRoute>
                                <UsersPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/sign-in"
                        element={
                            <SignInAdmin/>
                        }
                    />
                    <Route path="*" element={<NotFound/>} />

                </Routes>
                <ToastContainer />

            </ThemeProvider>



    );
}
