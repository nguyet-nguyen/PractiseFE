// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import SignIn from "layouts/pages/authentication/sign-in";
import Home from "pages/LandingPages/Home";
import ProductListPages from "pages/LandingPages/ProductListPage";
import SignUp from "pages/LandingPages/SignUp";
import ShoppingCart from "pages/LandingPages/ShoppingCart";

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
            name: "All Items",
            route: "/all-items",
            component: <ProductListPages/>,
          },
          {
            name: "Shopping Cart",
            route: "/shopping-cart",
            component: <ShoppingCart />,
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
