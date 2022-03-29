
// Practise React React components
import MKBox from "components/MKBox";


// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bannerHome from "assets/images/logos/banner-home.PNG"
import Banner from "./sections/Banner";
import ListPage from "./sections/ListPage";

function ProductListPages() {
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
                minHeight="75vh"
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
            {/* <Banner /> */}
            <ListPage />
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default ProductListPages;
