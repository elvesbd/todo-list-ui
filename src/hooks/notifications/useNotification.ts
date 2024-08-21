import { useContext } from "react";
import { NotificationContext } from "../../contexts/notification/NotificationContext";

export default function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
