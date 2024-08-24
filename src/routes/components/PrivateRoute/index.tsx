import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = Cookies.get("authToken");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
