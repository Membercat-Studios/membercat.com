import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (closeable && e.key === "Escape") {
                onClose();
            }
        };

        if (show) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [show, closeable, onClose]);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    const handleBackdropClick = (e) => {
        if (closeable && e.target === e.currentTarget) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    if (!isMounted) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex transform items-center justify-center overflow-y-auto px-4 py-6 transition-all duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
        >
            <div
                className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            />

            <div
                className={`relative transform overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 text-white shadow-xl transition-all duration-300 ${maxWidthClass} ${
                    isVisible
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-4 opacity-0 scale-95"
                }`}
            >
                {closeable && (
                    <Button
                        onClick={onClose}
                        appearance="danger"
                        className="absolute right-4 top-4 z-10 flex items-center justify-center"
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
}
