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
import bannerHome from "../../../assets/images/logos/banner-home.PNG";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-about-us.jpg";
import OurTeam from "./sections/OurTeam";
import IntroLogoName from "./sections/IntroLogoName";
import {useEffect} from "react";

function AboutUs() {
    useEffect(() => {
        const section = document.querySelector( '#aboutUs' );
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
      <MKBox
        minHeight="85vh"
        width="100%"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0),
              rgba(gradients.dark.state, 0)
            )}, url(${bannerHome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>
      <section  className="container h-auto mx-auto px-4 py-2 md:py-12 md:px-32">
        <div className="md:w-12/12 w-full h-auto transition-all rounded-lg mx-auto" id="aboutUs">
          <IntroLogoName />
          <OurTeam />
        </div>
      </section>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
   
  );
}

export default AboutUs;
