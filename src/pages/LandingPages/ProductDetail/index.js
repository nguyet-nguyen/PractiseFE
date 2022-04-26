import ItemDetail from "./sections/ItemDetail";

// Practise React React components
import MKBox from "components/MKBox";

// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bannerHome from "assets/images/logos/banner-home.PNG";
import BreadcrumbsItemDetail from "./sections/BreadcrumbsItemDetail";
import HotDeal from "../Home/sections/HotDeal";
import {useEffect} from "react";

const ProductDetail = () => {
    useEffect(() => {
        const section = document.querySelector( '#productDetailPage' );
        section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
    },[])
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={[
          {
            route: "/pages/authentication/sign-in",
            label: "Sign In",
            color: "default",
          },
          {
            route: "/pages/authentication/sign-up",
            label: "Sign Up",
            color: "default",
          },
        ]}
        transparent
        light
      />

            <BreadcrumbsItemDetail />
            <section id="productDetailPage" className="container h-auto mx-auto px-4 py-2 mx-auto md:py-12 md:px-32">
                <div className="md:w-12/12 w-full h-auto transition-all rounded-lg mx-auto">
                    <ItemDetail />
                    <div className="my-16">
                        <HotDeal />
                    </div>
                </div>
            </section>
       
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default ProductDetail;
