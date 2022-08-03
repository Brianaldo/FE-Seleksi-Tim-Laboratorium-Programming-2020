import React, { useState } from "react";

const ToastContext = React.createContext({
  toasts: [],
  push: (toast) => {},
});

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const pushToast = (toast) => {
    setToasts([...toasts, toast]);
  };

  const contextValue = {
    toasts: toasts,
    push: pushToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
