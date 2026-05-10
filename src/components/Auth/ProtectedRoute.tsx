import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function ProtectedRoute({children}: {children: React.ReactNode}) {
    const {accessToken} = useAppSelector((state) => state.auth);

    if (!accessToken) {
        return <Navigate to="/login?message=login_required" />;
    }
    return (
        <>{children}</>
    )
}

export default ProtectedRoute;