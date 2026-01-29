import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = (children, role) => {
    const {user} = useAuth;

    if (!user) {
        return <Navigate to="/admin" replace />
    }

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute;

