import { useRoutes } from "react-router-dom";

import Login from "../../pages/Login";
import Todos from "../../pages/Todos";
import TodosList from "../../pages/TodosList";
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
        { path: ":todosListId", element: <Todos /> },
      ],
    },
  ]);

  return routes;
}
