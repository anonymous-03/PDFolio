// In ToastContextProvider.jsx
import { createContext } from "react";
import { useState } from "react";

export const ToastContext=createContext();
const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToast(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToast(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ toast, setToast, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
