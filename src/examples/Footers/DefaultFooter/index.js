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
    const token = localStorage.getItem("token");
  return (
    <footer className="text-center py-8 lg:mt-32 border-t-2 border-t-slate-200 ">
     
        <Link to="/" className="flex justify-center items-center mb-8 mt-3">
            <img
                className="w-28"
                src={logoName}
                alt="logo"
            />
        </Link>
        <p className="mt-4 text-gray-400 italic ">
          Victoria Resort, Ninh Kieu District, Can Tho
        </p>
        {!token ?
            <div className="flex justify-center items-center mt-5 mb-2">
                <span className="mr-4 text-sm font-semibold">Register for free</span>
                <Link to="/pages/authentication/sign-up">
                    <button
                        type="button"
                        className="inline-block px-6 py-2 border-2 font-semibold border-amber-500 text-xs leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                        Sign up
                    </button>
                </Link>

            </div>
            : null
        }


      <div className="text-center p-4 font-bold">
        © 2022 {" "}
        <a className="font-bold" href="https://tailwind-elements.com/">
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
