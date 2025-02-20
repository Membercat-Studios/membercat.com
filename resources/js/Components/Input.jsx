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

    return (
        <div className={`relative space-y-1.5 ${className}`}>
            {label && (
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

            <input
                {...props}
                type={type}
                className={`
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
                `.trim()}
                ref={localRef}
            />
        </div>
    );
});

export default Input;
