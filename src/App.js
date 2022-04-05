// react-router components
import {Routes, Route, BrowserRouter} from "react-router-dom";

// @mui material components
import {ThemeProvider} from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";

import ProductDetail from "pages/LandingPages/ProductDetail";
import ProductsPage from "layouts/pages/admin/products";
import UsersPage from "layouts/pages/admin/users";
import DashboardPage from "layouts/pages/admin/dashboard";
import SignUpAdmin from "./pages/Admin/SignUp";
import PrivateRoute from "./pages/PrivateRoute";
import AddProductForm from "./pages/Admin/Products/sections/AddProductForm";
import ProductsTable from "./pages/Admin/Products/sections/ProductsTable";
import SignInAdmin from "./pages/Admin/SignIn";

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
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage/>
                            </PrivateRoute>
                        }>
                        <Route path="" element={<ProductsTable/>}/>
                        <Route path="add-product" element={<AddProductForm/>}/>
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
                        path="/admin/products"
                        element={
                            <PrivateRoute>
                                <ProductsPage/>
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
                        path="/admin/users"
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

                </Routes>
            </ThemeProvider>



    );
}
