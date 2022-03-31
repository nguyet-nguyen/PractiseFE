// react-router components
import { Routes, Route } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";
import SignInAdmin from "layouts/pages/admin/sign-in"
import Dashboard from "layouts/pages/admin/dashboard"

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
        <Route exact path="/admin/signIn" element={<SignInAdmin />} />
      </Routes>
    </ThemeProvider>
  );
}
