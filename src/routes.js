// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import ProductList from "layouts/pages/landing-pages/product-list"
import SignIn from "layouts/pages/authentication/sign-in";
import Home from "pages/LandingPages/Home";
import ProductListPages from "pages/LandingPages/ProductListPage";
import SignUp from "pages/LandingPages/SignUp";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "Home",
            route: "/",
            component: <Home/>,
          },
          {
            name: "product list page",
            route: "/product-list-page",
            component: <ProductListPages/>,
          },
          {
            name: "product list",
            route: "/product-list",
            component: <ProductList />,
          },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
          {
            name: "sign up",
            route: "/pages/authentication/sign-up",
            component: <SignUp />,
          },
        ],
      },
    ],
  }
];

export default routes;
