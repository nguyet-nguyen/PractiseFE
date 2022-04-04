import DefaultNavbar from "../../../examples/Navbars/DefaultNavbar";
import routes from "../../../routes";
import MKBox from "../../../components/MKBox";
import bannerHome from "../../../assets/images/logos/banner-home.PNG";

const Header = () => {
    return (
        <div>
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
        </div>
    )
}
export default Header