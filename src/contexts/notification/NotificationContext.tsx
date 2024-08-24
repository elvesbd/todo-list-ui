import { createContext, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  NotificationContextProps,
  NotificationProviderProps,
} from "./interfaces";

const NotificationContext = createContext<NotificationContextProps>(
  {} as NotificationContextProps
);

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const notifyInfo = (message: string) => {
    toast.info(message);
  };

  const contextValue = useMemo(
    () => ({
      notifySuccess,
      notifyError,
      notifyInfo,
    }),
    []
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
