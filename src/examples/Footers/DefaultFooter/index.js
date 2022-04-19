// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Practise React React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import logoName from "./../../../../src/assets/images/logos/logo-name.png"

function DefaultFooter({ content }) {
  const { brand, socials, menus, copyright } = content;

  return (
    // <MKBox component="footer">
    //   <Container>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12} md={3} sx={{ ml: "auto", mb: 3 }}>
    //         <MKBox>
    //           <Link to={brand.route}>
    //             <MKBox component="img" src={brand.image} alt={brand.name} maxWidth="2rem" mb={2} />
    //           </Link>
    //           <MKTypography variant="h6">{brand.name}</MKTypography>
    //         </MKBox>
    //         <MKBox display="flex" alignItems="center" mt={3}>
    //           {socials.map(({ icon, link }, key) => (
    //             <MKTypography
    //               key={link}
    //               component="a"
    //               href={link}
    //               target="_blank"
    //               rel="noreferrer"
    //               variant="h5"
    //               color="dark"
    //               opacity={0.8}
    //               mr={key === socials.length - 1 ? 0 : 2.5}
    //             >
    //               {icon}
    //             </MKTypography>
    //           ))}
    //         </MKBox>
    //       </Grid>
    //       {menus.map(({ name: title, items }) => (
    //         <Grid key={title} item xs={6} md={2} sx={{ mb: 3 }}>
    //           <MKTypography
    //             display="block"
    //             variant="button"
    //             fontWeight="bold"
    //             textTransform="capitalize"
    //             mb={1}
    //           >
    //             {title}
    //           </MKTypography>
    //           <MKBox component="ul" p={0} m={0} sx={{ listStyle: "none" }}>
    //             {items.map(({ name, route, href }) => (
    //               <MKBox key={name} component="li" p={0} m={0} lineHeight={1.25}>
    //                 {href ? (
    //                   <MKTypography
    //                     component="a"
    //                     href={href}
    //                     target="_blank"
    //                     rel="noreferrer"
    //                     variant="button"
    //                     fontWeight="regular"
    //                     textTransform="capitalize"
    //                   >
    //                     {name}
    //                   </MKTypography>
    //                 ) : (
    //                   <MKTypography
    //                     component={Link}
    //                     to={route}
    //                     variant="button"
    //                     fontWeight="regular"
    //                     textTransform="capitalize"
    //                   >
    //                     {name}
    //                   </MKTypography>
    //                 )}
    //               </MKBox>
    //             ))}
    //           </MKBox>
    //         </Grid>
    //       ))}
    //       <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
    //         {copyright}
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </MKBox>
    <footer class="text-center py-8 mt-48 border-t-2 border-t-slate-200 ">
     
        <Link to="/" className="flex justify-center items-center mb-8 mt-3">
            <img
                className="w-28"
                src={logoName}
                alt="logo"
            />
        </Link>
        <p class="mt-4 text-gray-400 italic ">
          Victoria Resort, Ninh Kieu District, Can Tho
        </p>
      <div class="flex justify-center items-center mt-5 mb-2">
        <span class="mr-4 text-sm font-semibold">Register for free</span>
        <Link to="/pages/authentication/sign-up">
          <button
            type="button"
            class="inline-block px-6 py-2 border-2 font-semibold border-amber-500 text-xs leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Sign up
          </button>
        </Link>
        
      </div>

      <div class="text-center p-4 font-bold">
        © 2022 {" "}
        <a class="font-bold" href="https://tailwind-elements.com/">
          Can Tho's Fresher Unlock 
        </a>
      </div>
    </footer>
  );
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default DefaultFooter;
