// react-router components
import { Routes, Route } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";
import ListPage from "pages/LandingPages/ProductListPage/sections/ListPage"

// Practise React React routes
import routes from "routes";

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
        {getRoutes(routes)}
        <Route path="/admin" element={<ListPage />} />
      </Routes>
    </ThemeProvider>
  );
}
