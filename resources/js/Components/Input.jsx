import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const Input = forwardRef(function Input(
    {
        label,
        error,
        type = "text",
        className = "",
        inputClassName = "",
        labelClassName = "",
        errorClassName = "",
        isFocused = false,
        options = [],
        helperText,
        icon,
        ...props
    },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const baseInputStyles = `
        block w-full rounded-md border bg-zinc-900 px-3 py-2 text-white
        placeholder:text-zinc-400
        transition-colors duration-200
        ${
            error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-zinc-700 focus:border-primary focus:ring-primary"
        }
        disabled:cursor-not-allowed disabled:opacity-50
        ${inputClassName}
    `.trim();

    const renderInput = () => {
        switch (type) {
            case "select":
                return (
                    <select
                        {...props}
                        ref={localRef}
                        className={baseInputStyles}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "checkbox":
                return (
                    <div className="flex items-center gap-2">
                        <input
                            {...props}
                            type="checkbox"
                            ref={localRef}
                            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-zinc-900"
                        />
                        {label && (
                            <label
                                htmlFor={props.id}
                                className={`text-sm text-white ${labelClassName}`}
                            >
                                {label}
                            </label>
                        )}
                    </div>
                );

            case "textarea":
                return (
                    <textarea
                        {...props}
                        ref={localRef}
                        className={baseInputStyles}
                        rows={props.rows || 4}
                    />
                );

            default:
                return (
                    <div className="relative">
                        {icon && (
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                <i className={icon} />
                            </span>
                        )}
                        <input
                            {...props}
                            type={type}
                            ref={localRef}
                            className={`
                                ${baseInputStyles}
                                ${icon ? "pl-10" : ""}
                            `.trim()}
                        />
                    </div>
                );
        }
    };

    return (
        <div className={`relative space-y-1.5 ${className}`}>
            {label && type !== "checkbox" && (
                <div className="flex items-center justify-between">
                    <label
                        htmlFor={props.id}
                        className={`block text-sm font-medium text-white ${labelClassName}`}
                    >
                        {label}
                    </label>
                    {error && (
                        <span
                            className={`text-xs text-red-500 ${errorClassName}`}
                        >
                            {error}
                        </span>
                    )}
                </div>
            )}

            {renderInput()}

            {helperText && !error && (
                <p className="mt-1 text-sm text-zinc-400">{helperText}</p>
            )}
        </div>
    );
});

export default Input;
