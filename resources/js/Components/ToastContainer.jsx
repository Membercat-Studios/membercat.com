import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import Toast from "./Toast";

let toastCount = 0;

const ToastContainer = forwardRef((props, ref) => {
    const [toasts, setToasts] = useState([]);

    const show = useCallback(({ message, type = "info", duration = 5000 }) => {
        const id = ++toastCount;

        setToasts((currentToasts) => [
            ...currentToasts,
            { id, message, type, duration },
        ]);

        return id;
    }, []);

    const close = useCallback((id) => {
        setToasts((currentToasts) =>
            currentToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    useImperativeHandle(ref, () => ({
        show,
        close,
    }));

    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => close(toast.id)}
                />
            ))}
        </>
    );
});

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
