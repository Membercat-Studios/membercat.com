import { usePage } from "@inertiajs/react";
import { createContext, useState } from "react";

import Logo from "@/Components/Logo";
import SidebarLink from "./SidebarLink";

export const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const { auth } = usePage().props;
    const [expanded, setExpanded] = useState(true);

    const isAdmin = auth.user.role === "admin";
    const isMod = auth.user.role === "mod";
    const isStaff = isAdmin || isMod;

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <div
                className={`flex h-screen flex-col border-r border-zinc-800 bg-zinc-950 ${
                    expanded ? "w-56" : "w-20"
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
                    <div className="flex items-center">
                        {expanded && (
                            <span className="ml-3 font-bold text-white">
                                Admin
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                        <i
                            className={`fas fa-chevron-${
                                expanded ? "left" : "right"
                            } text-sm`}
                        />
                    </button>
                </div>

                <nav
                    className={`flex-1 p-4 ${
                        !expanded && "items-center justify-center"
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        <SidebarLink
                            href={route("admin.dashboard")}
                            active={route().current("admin.dashboard")}
                            icon="fas fa-chart-line"
                        >
                            Dashboard
                        </SidebarLink>

                        <SidebarLink
                            href={route("admin.users")}
                            active={route().current("admin.users")}
                            icon="fas fa-users"
                        >
                            Users
                        </SidebarLink>

                        {isAdmin && (
                            <SidebarLink
                                href={route("admin.settings")}
                                active={route().current("admin.settings")}
                                icon="fas fa-cog"
                            >
                                Settings
                            </SidebarLink>
                        )}
                    </div>
                </nav>

                <div
                    className={`border-t border-zinc-800 p-4 ${
                        !expanded && "px-2"
                    }`}
                >
                    <SidebarLink
                        active={route().current("profile.*")}
                        icon="fas fa-user"
                    >
                        {auth.user.name}{" "}
                        {isStaff && `(${isAdmin ? "Admin" : "Mod"})`}
                    </SidebarLink>

                    <SidebarLink href={route("home")} icon="fas fa-home">
                        Go Home
                    </SidebarLink>
                </div>
            </div>
        </SidebarContext.Provider>
    );
}
