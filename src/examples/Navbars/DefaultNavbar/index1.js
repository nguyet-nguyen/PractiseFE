/* eslint-disable no-param-reassign */
import {Fragment, useState, useEffect} from "react";

// react-router components
import {Link} from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";

// Practise React React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Practise React React example components
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Practise React React base styles
import breakpoints from "assets/theme/base/breakpoints";
import {useNavigate} from "react-router-dom";
import {getAllCategory, getCountItemsInCart} from "../../../features/Api";
import Loading from "../../../Loading";

function DefaultNavbar1({
                           brand,
                           routes,
                           transparent,
                           light,
                           action,
                           sticky,
                           relative,
                           center,
                       }) {
    const [dropdown, setDropdown] = useState("");
    const [dropdownEl, setDropdownEl] = useState("");
    const [dropdownName, setDropdownName] = useState("");
    const [nestedDropdown, setNestedDropdown] = useState("");
    const [nestedDropdownEl, setNestedDropdownEl] = useState("");
    const [nestedDropdownName, setNestedDropdownName] = useState("");
    const [arrowRef, setArrowRef] = useState(null);
    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const openMobileNavbar = () => setMobileNavbar(!mobileNavbar);

    useEffect(() => {
        // A function that sets the display state for the DefaultNavbarMobile.
        function displayMobileNavbar() {
            if (window.innerWidth < breakpoints.values.lg) {
                setMobileView(true);
                setMobileNavbar(false);
            } else {
                setMobileView(false);
                setMobileNavbar(false);
            }
        }

        /**
         The event listener that's calling the displayMobileNavbar function when
         resizing the window.
         */
        window.addEventListener("resize", displayMobileNavbar);

        // Call the displayMobileNavbar function to set the state with the initial value.
        displayMobileNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", displayMobileNavbar);
    }, []);

    const renderNavbarItems = routes.map(
        ({name, icon, href, route, collapse}) => (
            <DefaultNavbarDropdown
                key={name}
                name={name}
                icon={icon}
                href={href}
                route={route}
                collapse={Boolean(collapse)}
                onMouseEnter={({currentTarget}) => {
                    if (collapse) {
                        setDropdown(currentTarget);
                        setDropdownEl(currentTarget);
                        setDropdownName(name);
                    }
                }}
                onMouseLeave={() => collapse && setDropdown(null)}
                light={light}
            />
        )
    );

    // Render the routes on the dropdown menu
    const renderRoutes = routes.map(
        ({name, collapse, columns, rowsPerColumn}) => {
            let template;

            // Render the dropdown menu that should be display as columns
            if (collapse && columns && name === dropdownName) {
                const calculateColumns = collapse.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index / rowsPerColumn);

                    if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [];
                    }

                    resultArray[chunkIndex].push(item);

                    return resultArray;
                }, []);

                template = (
                    <Grid key={name} container spacing={3} py={1} px={1.5}>
                        {calculateColumns.map((cols, key) => {
                            const gridKey = `grid-${key}`;
                            const dividerKey = `divider-${key}`;

                            return (
                                <Grid
                                    key={gridKey}
                                    item
                                    xs={12 / columns}
                                    sx={{position: "relative"}}
                                >
                                    {cols.map((col, index) => (
                                        <Fragment key={col.name}>
                                            <MKTypography
                                                display="block"
                                                variant="button"
                                                fontWeight="bold"
                                                textTransform="capitalize"
                                                py={1}
                                                px={0.5}
                                                mt={index !== 0 ? 2 : 0}
                                            >
                                                {col.name}
                                            </MKTypography>
                                            {col.collapse.map((item) => (
                                                <MKTypography
                                                    key={item.name}
                                                    component={item.route ? Link : MuiLink}
                                                    to={item.route ? item.route : ""}
                                                    href={
                                                        item.href ? item.href : (e) => e.preventDefault()
                                                    }
                                                    // target={item.href ? "_blank" : ""}
                                                    rel={item.href ? "noreferrer" : "noreferrer"}
                                                    minWidth="11.25rem"
                                                    display="block"
                                                    variant="button"
                                                    color="text"
                                                    textTransform="capitalize"
                                                    fontWeight="regular"
                                                    py={0.625}
                                                    px={2}
                                                    sx={({
                                                             palette: {grey, dark},
                                                             borders: {borderRadius},
                                                         }) => ({
                                                        borderRadius: borderRadius.md,
                                                        cursor: "pointer",
                                                        transition: "all 300ms linear",

                                                        "&:hover": {
                                                            backgroundColor: grey[200],
                                                            color: dark.main,
                                                        },
                                                    })}
                                                >
                                                    {item.name}
                                                </MKTypography>
                                            ))}
                                        </Fragment>
                                    ))}
                                    {key !== 0 && (
                                        <Divider
                                            key={dividerKey}
                                            orientation="vertical"
                                            sx={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "-4px",
                                                transform: "translateY(-45%)",
                                                height: "90%",
                                            }}
                                        />
                                    )}
                                </Grid>
                            );
                        })}
                    </Grid>
                );

                // Render the dropdown menu that should be display as list items
            } else if (collapse && name === dropdownName) {
                template = collapse.map((item) => {
                    const linkComponent = {
                        component: MuiLink,
                        href: item.href,
                        // target: "_blank",
                        rel: "noreferrer",
                    };

                    const routeComponent = {
                        component: Link,
                        to: item.route,
                    };

                    return (
                        <MKTypography
                            key={item.name}
                            {...(item.route ? routeComponent : linkComponent)}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            variant="button"
                            textTransform="capitalize"
                            minWidth={item.description ? "14rem" : "12rem"}
                            color={item.description ? "dark" : "text"}
                            fontWeight={item.description ? "bold" : "regular"}
                            py={item.description ? 1 : 0.625}
                            px={2}
                            sx={({palette: {grey, dark}, borders: {borderRadius}}) => ({
                                borderRadius: borderRadius.md,
                                cursor: "pointer",
                                transition: "all 300ms linear",

                                "&:hover": {
                                    backgroundColor: grey[200],
                                    color: dark.main,

                                    "& *": {
                                        color: dark.main,
                                    },
                                },
                            })}
                            onMouseEnter={({currentTarget}) => {
                                if (item.dropdown) {
                                    setNestedDropdown(currentTarget);
                                    setNestedDropdownEl(currentTarget);
                                    setNestedDropdownName(item.name);
                                }
                            }}
                            onMouseLeave={() => {
                                if (item.dropdown) {
                                    setNestedDropdown(null);
                                }
                            }}
                        >
                            {item.description ? (
                                <MKBox>
                                    {item.name}
                                    <MKTypography
                                        display="block"
                                        variant="button"
                                        color="text"
                                        fontWeight="regular"
                                        sx={{transition: "all 300ms linear"}}
                                    >
                                        {item.description}
                                    </MKTypography>
                                </MKBox>
                            ) : (
                                item.name
                            )}
                            {item.collapse && (
                                <Icon
                                    fontSize="small"
                                    sx={{
                                        fontWeight: "normal",
                                        verticalAlign: "middle",
                                        mr: -0.5,
                                    }}
                                >
                                    keyboard_arrow_right
                                </Icon>
                            )}
                        </MKTypography>
                    );
                });
            }

            return template;
        }
    );

    // Routes dropdown menu
    const dropdownMenu = (
        <Popper
            anchorEl={dropdown}
            popperRef={null}
            open={Boolean(dropdown)}
            placement="top-start"
            transition
            style={{zIndex: 10}}
            modifiers={[
                {
                    name: "arrow",
                    enabled: true,
                    options: {
                        element: arrowRef,
                    },
                },
            ]}
            onMouseEnter={() => setDropdown(dropdownEl)}
            onMouseLeave={() => {
                if (!nestedDropdown) {
                    setDropdown(null);
                    setDropdownName("");
                }
            }}
        >
            {({TransitionProps}) => (
                <Grow
                    {...TransitionProps}
                    sx={{
                        transformOrigin: "left top",
                        background: ({palette: {white}}) => white.main,
                    }}
                >
                    <MKBox borderRadius="lg">
                        <MKTypography variant="h1" color="white">
                            <Icon ref={setArrowRef} sx={{mt: -3}}>
                                arrow_drop_up
                            </Icon>
                        </MKTypography>
                        <MKBox shadow="lg" borderRadius="lg" p={2} mt={2}>
                            {renderRoutes}
                        </MKBox>
                    </MKBox>
                </Grow>
            )}
        </Popper>
    );

    // Render routes that are nested inside the dropdown menu routes
    const renderNestedRoutes = routes.map(({collapse, columns}) =>
        collapse && !columns
            ? collapse.map(({name: parentName, collapse: nestedCollapse}) => {
                let template;

                if (parentName === nestedDropdownName) {
                    template =
                        nestedCollapse &&
                        nestedCollapse.map((item) => {
                            const linkComponent = {
                                component: MuiLink,
                                href: item.href,
                                // target: "_blank",
                                rel: "noreferrer",
                            };

                            const routeComponent = {
                                component: Link,
                                to: item.route,
                            };

                            return (
                                <MKTypography
                                    key={item.name}
                                    {...(item.route ? routeComponent : linkComponent)}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    variant="button"
                                    textTransform="capitalize"
                                    minWidth={item.description ? "14rem" : "12rem"}
                                    color={item.description ? "dark" : "text"}
                                    fontWeight={item.description ? "bold" : "regular"}
                                    py={item.description ? 1 : 0.625}
                                    px={2}
                                    sx={({
                                             palette: {grey, dark},
                                             borders: {borderRadius},
                                         }) => ({
                                        borderRadius: borderRadius.md,
                                        cursor: "pointer",
                                        transition: "all 300ms linear",

                                        "&:hover": {
                                            backgroundColor: grey[200],
                                            color: dark.main,

                                            "& *": {
                                                color: dark.main,
                                            },
                                        },
                                    })}
                                >
                                    {item.description ? (
                                        <MKBox>
                                            {item.name}
                                            <MKTypography
                                                display="block"
                                                variant="button"
                                                color="text"
                                                fontWeight="regular"
                                                sx={{transition: "all 300ms linear"}}
                                            >
                                                {item.description}
                                            </MKTypography>
                                        </MKBox>
                                    ) : (
                                        item.name
                                    )}
                                    {item.collapse && (
                                        <Icon
                                            fontSize="small"
                                            sx={{
                                                fontWeight: "normal",
                                                verticalAlign: "middle",
                                                mr: -0.5,
                                            }}
                                        >
                                            keyboard_arrow_right
                                        </Icon>
                                    )}
                                </MKTypography>
                            );
                        });
                }

                return template;
            })
            : null
    );

    // Dropdown menu for the nested dropdowns
    const nestedDropdownMenu = (
        <Popper
            anchorEl={nestedDropdown}
            popperRef={null}
            open={Boolean(nestedDropdown)}
            placement="right-start"
            transition
            style={{zIndex: 10}}
            onMouseEnter={() => {
                setNestedDropdown(nestedDropdownEl);
            }}
            onMouseLeave={() => {
                setNestedDropdown(null);
                setNestedDropdownName("");
                setDropdown(null);
            }}
        >
            {({TransitionProps}) => (
                <Grow
                    {...TransitionProps}
                    sx={{
                        transformOrigin: "left top",
                        background: ({palette: {white}}) => white.main,
                    }}
                >
                    <MKBox ml={2.5} mt={-2.5} borderRadius="lg">
                        <MKBox shadow="lg" borderRadius="lg" py={1.5} px={1} mt={2}>
                            {renderNestedRoutes}
                        </MKBox>
                    </MKBox>
                </Grow>
            )}
        </Popper>
    );
    const [countItemCart, setCountItemCart] = useState(0);
    useEffect(() => {
        getCountItemsInCart()
            .then((response) => {
                setCountItemCart(response.data.count);
                console.log(countItemCart);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const token = localStorage.getItem("token");
    const users = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    const SignOut = () => {
        try {
            localStorage.clear();
            navigate("/");
        } catch {
            console.log("loi");
        }
    };
    return (
        <Container sx={sticky ? {position: "sticky", top: 0, zIndex: 10} : null}>
            <MKBox
                py={1}
                px={{xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2}}
                my={relative ? 0 : 2}
                mx={relative ? 0 : 3}
                width={relative ? "100%" : "calc(100% - 48px)"}
                borderRadius="xl"
                shadow={transparent ? "none" : "md"}
                color={light ? "white" : "dark"}
                position={relative ? "relative" : "absolute"}
                left={0}
                zIndex={3}
                sx={({
                         palette: {transparent: transparentColor, white},
                         functions: {rgba},
                     }) => ({
                    backgroundColor: transparent
                        ? transparentColor.main
                        : rgba(white.main, 0.8),
                    backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
                })}
            >
                <MKBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <MKBox
                        component={Link}
                        to="/"
                        lineHeight={1}
                        py={transparent ? 1.5 : 0.75}
                        pl={relative || transparent ? 0 : {xs: 0, lg: 1}}
                    >

                    </MKBox>
                    <MKBox
                        color="inherit"
                        display={{xs: "none", lg: "flex"}}
                        ml="auto"
                        mr={center ? "auto" : 0}
                    >
                        {renderNavbarItems}
                    </MKBox>
                    {token ? (
                        <div className="flex items-center">
                            <Link to="/shopping-cart">
                                <div className="inline-flex items-center relative w-fit mr-8">
                                    <div
                                        className="absolute inline-block top-0 right-0
                                    bottom-auto left-auto translate-x-1/3 -translate-y-0
                                     rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1.5 px-3
                                      text-xs leading-none text-center whitespace-nowrap align-baseline
                                       font-bold bg-amber-600 text-white rounded-full z-10"
                                    >
                                        {countItemCart}
                                    </div>
                                    <div
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block px-2 py-2.5 text-white
                                        text-xs leading-tight uppercase rounded hover:shadow-lg
                                        focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg
                                         transition duration-150 ease-in-out"
                                    >
                                        <i
                                            className={`fa fa-shopping-cart pr-2 text-white text-2xl`}
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/user-profile">
                                <div className="md:flex items-center hidden ">
                                    <img
                                        src={users.image}
                                        className="rounded-full w-8 h-8 shadow-lg border-2 border-amber-600"
                                        alt="Avatar"
                                    />
                                </div>
                            </Link>
                            {/*<Link*/}
                            {/*  to="/"*/}
                            {/*  onClick={SignOut}*/}
                            {/*  className="inline-block px-6 py-2 border-2 hover:bg-white rounded-lg hover:text-amber-700 border-amber-600 font-bold*/}
                            {/*                  text-sm leading-tight uppercase bg-amber-600 text-white*/}
                            {/*                  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"*/}
                            {/*>*/}
                            {/*  Sign out*/}
                            {/*</Link>*/}

                        </div>

                    ) : (
                        <>
                            <MKBox ml={{xs: "auto", lg: 0}}>
                                {action &&
                                    (action.type === "internal" ? (
                                        <MKButton
                                            component={Link}
                                            to={action.route}
                                            variant={
                                                action.color === "white" || action.color === "default"
                                                    ? "contained"
                                                    : "gradient"
                                            }
                                            color={action.color ? action.color : "info"}
                                            size="small"
                                        >
                                            {action.label}
                                        </MKButton>
                                    ) : (
                                        <MKButton
                                            component="a"
                                            href={action[0].route}
                                            // target="_blank"
                                            rel="noreferrer"
                                            variant={
                                                action[0].color === "white" ||
                                                action[0].color === "default"
                                                    ? "contained"
                                                    : "gradient"
                                            }
                                            color={action[0].color ? action[0].color : "info"}
                                            size="small"
                                        >
                                            {action[0].label}
                                        </MKButton>
                                    ))}
                            </MKBox>
                            <MKBox ml={{xs: "auto", lg: 1}}>
                                {action &&
                                    (action.type === "internal" ? (
                                        <MKButton
                                            component={Link}
                                            to={action.route}
                                            variant={
                                                action.color === "white" || action.color === "default"
                                                    ? "contained"
                                                    : "gradient"
                                            }
                                            color={action.color ? action.color : "info"}
                                            size="small"
                                        >
                                            {action.label}
                                        </MKButton>
                                    ) : (
                                        <>
                                            <MKButton
                                                component="a"
                                                href={action[1].route}
                                                // target="_blank"
                                                rel="noreferrer"
                                                variant={
                                                    action[1].color === "white" ||
                                                    action[1].color === "default"
                                                        ? "contained"
                                                        : "gradient"
                                                }
                                                color={action[1].color ? action[1].color : "info"}
                                                size="small"
                                            >
                                                {action[1].label}
                                            </MKButton>
                                        </>
                                    ))}
                            </MKBox>
                        </>
                    )}
                    <MKBox
                        display={{xs: "inline-block", lg: "none"}}
                        lineHeight={0}
                        py={1.5}
                        pl={1.5}
                        color={transparent ? "white" : "inherit"}
                        sx={{cursor: "pointer"}}
                        onClick={openMobileNavbar}
                    >
                        <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
                    </MKBox>
                </MKBox>
                <MKBox
                    bgColor={transparent ? "white" : "transparent"}
                    shadow={transparent ? "lg" : "none"}
                    borderRadius="xl"
                    px={transparent ? 2 : 0}
                >
                    {mobileView && (
                        <DefaultNavbarMobile routes={routes} open={mobileNavbar}/>
                    )}
                </MKBox>
            </MKBox>
            {dropdownMenu}
            {nestedDropdownMenu}
        </Container>
    );
}



export default DefaultNavbar1;
