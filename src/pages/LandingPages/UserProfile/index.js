// Practise React React components
import MKBox from "components/MKBox";

// Practise React React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
// Routes
import routes from "routes";
import footerRoutes from "footer.routes";
import Profile from "./sections/Profile";

// Images
import bannerHome from "assets/images/logos/banner-home.PNG";
import BreadcrumbsProfile from "./sections/Breadcrumbs";

const UserProfile = () => {
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
      <section className="container h-auto mx-auto px-4 py-2 md:py-12 md:px-32">
        <div className="md:w-12/12 w-full h-auto transition-all rounded-lg mx-auto">
          <BreadcrumbsProfile />
          <Profile />
        </div>
      </section>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default UserProfile;
