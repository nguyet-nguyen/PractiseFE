import {Navigate} from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const users = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");


    return ((token) && (users.roles[0] === "ROLE_ADMIN" )) ? children : <Navigate to="/" />;

}