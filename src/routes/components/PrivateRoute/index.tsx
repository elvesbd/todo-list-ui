import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../../components/Layout";

const PrivateRoute = () => {
  const token = Cookies.get("authToken");

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
