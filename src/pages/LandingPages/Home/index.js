// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Practise React React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bannerHome from "assets/images/logos/banner-home.PNG"
import ProductList from "./sections/ProductList";
import Category from "./sections/Category";
import BannerHomepage from "./sections/Banner";
import HotDeal from "./sections/HotDeal";
function Home() {
    return (
        <>
            <DefaultNavbar
                routes={routes}
                action={{
                    route: "/pages/authentication/sign-in",
                    label: "Sign In",
                    color: "default",
                }}
                transparent
                light
            />
            <MKBox
                minHeight="85vh"
                width="100%"
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        `${linearGradient(
                            rgba(gradients.dark.main, 0),
                            rgba(gradients.dark.state, 0)
                        )}, url(${bannerHome})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "grid",
                    placeItems: "center",
                }}>
            </MKBox>
            <Category/>
            <ProductList />
            <BannerHomepage />
            <HotDeal/>
        
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default Home;
