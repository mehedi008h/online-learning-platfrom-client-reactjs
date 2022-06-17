import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isInstructor, redirectPath = "/", children }) => {
    const { loading, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    if (loading === false) {
        if (isAuthenticated === false) {
            return <Navigate to={redirectPath} replace />;
        }

        if (isInstructor === true && !user.role.includes("Instructor")) {
            return <Navigate to={redirectPath} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
