// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import Home from "pages/LandingPages/Home";
import ProductListPages from "pages/LandingPages/ProductListPage";


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
            route: "/all-items/:id",
            component: <ProductListPages/>,
          },
          // {
          //   name: "Shopping Cart",
          //   route: "/shopping-cart",
          //   component: <ShoppingCart />,
          // },
        ],
      },
      
    ],
  }
];

export default routes;
