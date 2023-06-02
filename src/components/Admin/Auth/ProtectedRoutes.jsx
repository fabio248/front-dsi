import { Navigate, Outlet } from "react-router-dom";

// Valida el acceso a la rutas acorde a los permisos y roles de usuario
export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/"}) => {
    
    if (!isAllowed){
        return <Navigate to = {redirectTo} />
    }

    return children ? children : <Outlet />
}