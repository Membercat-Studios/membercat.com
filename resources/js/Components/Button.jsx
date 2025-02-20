import React from "react";
import PropTypes from "prop-types";

const Button = ({
    children,
    appearance = "primary",
    onClick = () => {},
    disabled = false,
    icon = null,
    type = "button",
    fullWidth = false,
    size = "sm",
    className = "",
    loading = false,
}) => {
    const appearanceStyles = {
        primary: "bg-primary text-white",
        secondary: "border-2 border-primary text-white bg-transparent",
        text: "text-primary hover:underline bg-transparent",
        gray: "bg-gray-200 text-gray-800",
        success: "bg-green-500 text-white",
        danger: "bg-red-500 text-white",
    };

    const sizeStyles = {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
    };

    const isDisabled = disabled || loading;

    const baseClasses = `
    inline-flex
    items-center
    justify-center
    font-medium
    rounded-md
    transition
    duration-200
    ${
        isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-85 active:scale-95 cursor-pointer"
    }
    ${fullWidth ? "w-full" : ""}
    ${appearanceStyles[appearance]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

    return (
        <button
            type={type}
            className={baseClasses}
            onClick={isDisabled ? undefined : onClick}
            disabled={isDisabled}
        >
            {loading ? (
                <span className="inline-block animate-spin mr-2">
                    <i className="fas fa-spinner" />
                </span>
            ) : icon ? (
                <span className="mr-2">
                    <i className={icon} />
                </span>
            ) : null}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    appearance: PropTypes.oneOf([
        "primary",
        "secondary",
        "text",
        "gray",
        "success",
        "danger",
    ]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    fullWidth: PropTypes.bool,
    size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    className: PropTypes.string,
    loading: PropTypes.bool,
};

export default Button;
