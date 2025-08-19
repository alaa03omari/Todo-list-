import { createContext, useContext, useState } from "react";
import MySnackbar from "../Components/MySnackbar";

export const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    function showHideToast(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
            setOpen(false);
        }, 3000)
    }
    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackbar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    )
}
