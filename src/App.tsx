import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { NotificationProvider } from "./contexts/notification/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
