// react-router components
import { Routes, Route } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";
import Dashboard from "pages/Admin/DashBoard";
import ProductDetail from "pages/LandingPages/ProductDetail";
import ProductsPage from "layouts/pages/admin/products";
import UsersPage from "layouts/pages/admin/users";
import SignInAdminPage from "layouts/pages/admin/sign-in";
import UsersTable from "./pages/Admin/Users/sections/UserTable";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";

export default function App() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* User Page */}
        {getRoutes(routes)}

        {/* Admin Page */}
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/dashboard/users" element={<Users />} />
          <Route exact path="/admin/dashboard/products" element={<Products />} />
          <Route exact path="/admin/sign-in" element={<SignInAdminPage />} />
        <Route exact path="/admin/products" element={<ProductsPage />} />
        <Route exact path="/admin/users" element={<UsersPage />} />

        <Route exact path="/all-items/item-detail" element={<ProductDetail />} />
      </Routes>
    </ThemeProvider>
  );
}
