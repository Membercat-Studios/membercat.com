import { Link } from "@inertiajs/react";
import { useContext } from "react";

import { SidebarContext } from "./Sidebar";

export default function SidebarLink({
    href,
    icon,
    children,
    active = false,
    method = "get",
    className = "",
}) {
    const { expanded } = useContext(SidebarContext);

    return (
        <Link
            href={href}
            method={method}
            className={`
                flex items-center rounded px-3 py-2 text-sm
                ${!expanded && "justify-center px-2"}
                ${
                    active
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
                ${className}
            `}
            title={!expanded ? children : undefined}
        >
            <i
                className={`
                    ${icon} 
                    ${expanded ? "mr-3 text-base" : "text-lg"}
                `}
            />
            {expanded && children}
        </Link>
    );
}
