import { useRoutes } from "react-router-dom";

import Login from "./pages/Login";
import TodosList from "./pages/TodosList";
import TodoDetails from "./pages/TodoDetails";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/todos",
      element: <TodosList />,
    },
    {
      path: "/todos/:id",
      element: <TodoDetails />,
    },
  ]);

  return routes;
}
