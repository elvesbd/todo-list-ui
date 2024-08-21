import { ReactNode } from "react";

export interface NotificationContextProps {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  notifyInfo: (message: string) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}
