import React from "react";
import { Toaster } from "react-hot-toast";

export const Notifier: React.FC = () => {
  return <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />;
};
