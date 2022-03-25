// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ProductList from "layouts/pages/landing-pages/product-list"
import SignIn from "layouts/pages/authentication/sign-in";

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
            component: <AboutUs />,
          },
          {
            name: "about us",
            route: "/about-us",
            component: <AboutUs />,
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
        ],
      },
    ],
  }
];

export default routes;
