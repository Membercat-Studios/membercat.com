import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Toast = ({
    show = false,
    message,
    type = "info",
    duration = 5000,
    onClose,
    position = "bottom-right",
}) => {
    const [isVisible, setIsVisible] = useState(show);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const remainingTimeRef = useRef(duration);
    const startTimeRef = useRef(Date.now());

    const styles = {
        info: {
            background: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-500",
            icon: "fa-circle-info",
        },
        success: {
            background: "bg-green-500/10",
            border: "border-green-500/20",
            text: "text-green-500",
            icon: "fa-circle-check",
        },
        warning: {
            background: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            text: "text-yellow-500",
            icon: "fa-triangle-exclamation",
        },
        danger: {
            background: "bg-red-500/10",
            border: "border-red-500/20",
            text: "text-red-500",
            icon: "fa-circle-exclamation",
        },
    };

    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
    };

    useEffect(() => {
        setIsVisible(show);
        if (show) {
            startTimer();
        }
    }, [show]);

    const startTimer = () => {
        clearTimeout(timerRef.current);
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, remainingTimeRef.current);
    };

    const pauseTimer = () => {
        clearTimeout(timerRef.current);
        remainingTimeRef.current -= Date.now() - startTimeRef.current;
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
        pauseTimer();
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        startTimer();
    };

    if (!isVisible) return null;

    const currentStyle = styles[type];

    return (
        <div
            className={`
                fixed ${positionClasses[position]} z-50
                transform transition-all duration-300 ease-in-out
                ${
                    isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                }
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    border ${currentStyle.border} ${currentStyle.background}
                    shadow-lg backdrop-blur-md
                `}
            >
                <i
                    className={`fas ${currentStyle.icon} ${currentStyle.text}`}
                />
                <p className={`${currentStyle.text} font-medium`}>{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    className={`
                        ml-4 ${currentStyle.text} opacity-50 hover:opacity-100
                        transition-opacity duration-200
                    `}
                >
                    <i className="fas fa-xmark" />
                </button>
            </div>
        </div>
    );
};

Toast.propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "success", "warning", "danger"]),
    duration: PropTypes.number,
    onClose: PropTypes.func,
    position: PropTypes.oneOf([
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
    ]),
};

export default Toast;
