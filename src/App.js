// react-router components
import { Routes, Route } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";
import ProductDetail from "pages/LandingPages/ProductDetail";
import ProductsPage from "layouts/pages/admin/products";
import UsersPage from "layouts/pages/admin/users";
import SignInAdminPage from "layouts/pages/admin/sign-in";
import DashboardPage from "layouts/pages/admin/dashboard";

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
        <Route exact path="/admin/dashboard" element={<DashboardPage />} />
        <Route exact path="/admin/sign-in" element={<SignInAdminPage />} />
        <Route exact path="/admin/products" element={<ProductsPage />} />
        <Route exact path="/admin/users" element={<UsersPage />} />

        <Route exact path="/all-items/item-detail" element={<ProductDetail />} />
      </Routes>
    </ThemeProvider>
  );
}
