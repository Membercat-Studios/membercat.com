import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

import Gravatar from "@/Components/Gravatar";
import Logo from "@/Components/Logo";

const NAV_LINKS = [
    { href: route("home"), label: "Home" },
    { href: route("projects"), label: "Projects" },
    { href: route("about"), label: "About" },
    { href: route("news"), label: "News" },
];

export default function Navbar() {
    const { auth } = usePage().props;
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    const handleLogout = () => {
        setLoading(true);
    };

    const userMenuItems = [
        {
            label: "Profile",
            icon: "fa-user",
            href: route("profile.edit"),
        },
        {
            label: "Settings",
            icon: "fa-gear",
            href: route("settings"),
        },
        { type: "divider" },
        ...(auth.user?.role === "admin"
            ? [
                  {
                      label: "Admin Panel",
                      icon: "fa-shield-halved",
                      href: route("admin.dashboard"),
                  },
              ]
            : []),
        ...(auth.user?.role === "mod" || auth.user?.role === "admin"
            ? [
                  {
                      label: "Moderation Panel",
                      icon: "fa-shield-halved",
                      href: route("mod.dashboard"),
                  },
              ]
            : []),
        {
            label: "Sign out",
            icon: "fa-right-from-bracket",
            href: route("logout"),
            method: "post",
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <nav className="fixed left-0 right-0 top-4 z-[100]">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 shadow-lg backdrop-blur-md">
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <Logo className="h-10 w-10 fill-current text-primary transition-transform duration-300 group-hover:scale-110" />
                        </Link>

                        <div className="hidden space-x-6 md:flex">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-zinc-300 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="flex items-center space-x-3 rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800/50 transition-all duration-200"
                                >
                                    <Gravatar
                                        email={auth.user.email}
                                        size={24}
                                        className="h-6 w-6 rounded-full border-2 border-primary/20 transition-all duration-300 hover:border-primary/50"
                                    />
                                    <span className="text-zinc-300">
                                        {auth.user.name}
                                    </span>
                                    <i
                                        className={`fas fa-chevron-down text-xs text-zinc-500 transition-transform duration-200 ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`
                                    absolute right-0 mt-2 w-56 rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg
                                    transition-all duration-200 origin-top-right
                                    ${
                                        isDropdownOpen
                                            ? "opacity-100 scale-100"
                                            : "opacity-0 scale-95 pointer-events-none"
                                    }
                                `}
                                >
                                    <div className="p-2 space-y-1">
                                        {userMenuItems.map((item, index) =>
                                            item.type === "divider" ? (
                                                <div
                                                    key={index}
                                                    className="h-px bg-zinc-700 my-1"
                                                />
                                            ) : (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    method={item.method}
                                                    onClick={item.onClick}
                                                    className={`
                                                        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm
                                                        transition-colors duration-200 w-full hover:!cursor-pointer
                                                        ${
                                                            item.danger
                                                                ? "text-red-400 hover:bg-red-500/10"
                                                                : "text-zinc-300 hover:bg-zinc-800"
                                                        }
                                                        ${
                                                            loading &&
                                                            item.danger
                                                                ? "opacity-50 cursor-wait"
                                                                : ""
                                                        }
                                                    `}
                                                >
                                                    <i
                                                        className={`fas ${
                                                            item.icon
                                                        } w-4 ${
                                                            loading &&
                                                            item.danger
                                                                ? "fa-spin"
                                                                : ""
                                                        }`}
                                                    />
                                                    <span>{item.label}</span>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={route("login")}
                                className="flex items-center space-x-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-150 hover:bg-primary hover:text-white"
                            >
                                <i className="fas fa-right-to-bracket" />
                                <span>Sign in</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
