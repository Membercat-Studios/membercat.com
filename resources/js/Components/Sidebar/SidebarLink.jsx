import { Link } from "@inertiajs/react";
import { useContext } from "react";

import { SidebarContext } from "./Sidebar";

export default function SidebarLink({
    href,
    icon,
    children,
    active = false,
    external = false,
    method = "get",
    loading = false,
    onClick,
    className,
}) {
    const { expanded } = useContext(SidebarContext);
    const Component = external ? "a" : Link;
    const externalProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Component
            href={href}
            method={method}
            {...externalProps}
            onClick={onClick}
            className={`
                group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium
                transition-all duration-150
                ${className} 
                ${
                    active
                        ? "bg-primary/10 text-primary"
                        : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                }
                ${loading ? "opacity-50 cursor-wait" : ""}
            `}
        >
            {icon && (
                <i
                    className={`${loading ? "fas fa-spinner" : icon} ${
                        expanded ? "text-lg" : "text-xl"
                    } ${loading ? "fa-spin" : ""}`}
                />
            )}
            {expanded && <span>{children}</span>}
        </Component>
    );
}
