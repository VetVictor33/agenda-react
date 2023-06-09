import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function PrivateRoute({ children, redirectTo }) {
    const { token } = useUser();

    return token ? children : <Navigate to={redirectTo} />
}