import { createContext, useState } from "react";
import { usePage } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import Gravatar from "@/Components/Gravatar";
import SidebarLink from "./SidebarLink";

export const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const { auth } = usePage().props;
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
    };

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <div
                className={`
                    relative flex h-screen flex-col border-r border-zinc-800 bg-zinc-950
                    transition-all duration-300 ease-in-out
                    ${expanded ? "w-56" : "w-20"}
                `}
            >
                <div className="flex h-16 items-center border-b border-zinc-800/50 px-4">
                    <div
                        className={`
                            flex w-full items-center gap-3
                            ${expanded ? "" : "justify-center"}
                        `}
                    >
                        <Logo className="h-8 w-8 fill-current text-primary transition-transform duration-300 hover:scale-110" />
                        {expanded && (
                            <span className="text-xl font-bold tracking-tight text-primary">
                                Membercat
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className={`
                        flex flex-1 flex-col
                        ${expanded ? "px-4" : "px-2"}
                    `}
                >
                    <nav
                        className={`
                            flex flex-1 flex-col gap-2 py-4
                            ${expanded ? "" : "items-center"}
                        `}
                    >
                        {children}
                    </nav>
                </div>

                <div className="border-t border-zinc-800/50 px-4 py-4">
                    <SidebarLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                    >
                        <div
                            className={`
                                flex items-center gap-3
                                ${expanded ? "" : "justify-center"}
                            `}
                        >
                            <Gravatar
                                email={auth.user.email}
                                size={expanded ? 32 : 24}
                                className={`
                                    rounded-full border-2 border-primary/20 
                                    transition-all duration-300
                                    hover:border-primary/50 
                                    ${expanded ? "h-8 w-8" : "h-6 w-6"}
                                `}
                            />
                            {expanded && (
                                <div className="min-w-0 flex-1">
                                    <div className="max-w-[150px] truncate text-sm font-medium text-white">
                                        {auth.user.name}
                                    </div>
                                    <div className="max-w-[150px] truncate text-xs text-zinc-500">
                                        {auth.user.email}
                                    </div>
                                </div>
                            )}
                        </div>
                    </SidebarLink>

                    <div className="mt-3">
                        <SidebarLink
                            href={route("logout")}
                            method="post"
                            icon="fas fa-sign-out-alt"
                            loading={loading}
                            onClick={handleLogout}
                            className="hover:!bg-red-500/10 hover:!cursor-pointer !text-red-500 !w-full hover:!text-red-500"
                        >
                            Log out
                        </SidebarLink>
                    </div>
                </div>
            </div>

            {/* Collapse Button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className={`
                    fixed left-0 top-8 -translate-y-1/2
                    flex h-12 w-6 items-center justify-center
                    rounded-r-lg border border-l-0 border-zinc-800
                    bg-zinc-900 text-zinc-400 
                    transition-all duration-300 ease-in-out
                    hover:bg-zinc-800 hover:text-white
                    ${expanded ? "translate-x-56" : "translate-x-20"}
                `}
            >
                <i
                    className={`fas fa-chevron-${expanded ? "left" : "right"}`}
                />
            </button>
        </SidebarContext.Provider>
    );
}
