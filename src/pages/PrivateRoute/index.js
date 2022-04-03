import {Route} from "react-router-dom";
import {Navigate} from 'react-router-dom';

// function PrivateRoute({ children }) {
//     const auth = useAuth();
//     return auth ? children : <Navigate to="/login" />;
// }
export default function PrivateRoute({ children }) {
    // const navigate = useNavigate();

    const user = localStorage.getItem("token");

    return user ? children : <Navigate to="/" />;

}