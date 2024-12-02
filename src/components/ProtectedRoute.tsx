import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = Cookies.get("token");

  useEffect(()=>{
    if(!token){
        <Navigate to="/login" />;
    }
  },[token]);
  if (!token) {
    return <Navigate to="/login" />;
  }

  let userRole = null;
  try {
    const decoded: { [key: string]: any } = jwtDecode(token);
    userRole = decoded["role"];
  } catch (error) {
    console.error("Failed to decode token", error);
    return <Navigate to="/login" />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
