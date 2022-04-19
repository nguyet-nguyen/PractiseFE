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
import bannerHome from "assets/images/logos/banner-home.PNG";
import ProductList from "./sections/ProductList";
import Category from "./sections/Category";
import BannerHomepage from "./sections/Banner";
import HotDeal from "./sections/HotDeal";
import Header from "../Header";
import {useEffect, useState} from "react";
import {getAllCategory, getProductHotDeal} from "../../../features/Api";
import Loading from "../../../Loading";

function Home() {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {

        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);
    return (
        <>
            <Header/>
            <section className="container h-auto md:px-5 px-4 py-2 mx-auto md:py-12 md:px-24">
                <div className="md:w-12/12 w-full h-auto transition-all rounded-lg mx-auto">
                    <>
                        <Category categoryList={categoryList}/>
                        <ProductList/>
                        <BannerHomepage/>
                        <HotDeal/>
                    </>
                </div>
            </section>

            <MKBox pt={6} px={1} mt={6}>
                <DefaultFooter content={footerRoutes}/>
            </MKBox>
        </>
    );
}

export default Home;
