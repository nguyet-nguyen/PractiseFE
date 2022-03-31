
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
import ListPage from "./sections/ListPage";
import BreadcrumbsProductList from "./sections/Breadcrumbs";
import SideNavFilter from "./sections/SideNavFilter";
import { useState } from "react";

function ProductListPages() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <section className="container h-auto mx-auto px-4 py-2 mx-auto md:py-12 md:px-32 productListPage">
                <div className="md:w-12/12 w-full h-auto transition-all rounded-lg mx-auto">
                    <BreadcrumbsProductList />
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        <div className="md:mt-14 mt-0">
                            <SideNavFilter sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                        </div>
                        <div class="col-span-3">
                            <ListPage  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                        </div>
                    </div>

                </div>
            </section>
            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
}

export default ProductListPages;
