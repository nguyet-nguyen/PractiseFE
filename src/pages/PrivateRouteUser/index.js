import {Navigate} from 'react-router-dom';

export default function PrivateRouteUser({ children }) {
    const users = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");
    return ((token) && (users.roles[0] === "ROLE_USER" )) ? children : <Navigate to="/pages/authentication/sign-in" />;

}