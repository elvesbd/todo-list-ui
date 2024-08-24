import { useRoutes } from "react-router-dom";

import Login from "../../pages/Login";
import TodosList from "../../pages/TodosList";
import TodoDetails from "../../pages/TodoDetails";
import PrivateRoute from "../components/PrivateRoute";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/todos",
      element: <PrivateRoute />,
      children: [
        { path: "", element: <TodosList /> },
        { path: ":id", element: <TodoDetails /> },
      ],
    },
  ]);

  return routes;
}
