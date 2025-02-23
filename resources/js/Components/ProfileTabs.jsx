import { Link } from "@inertiajs/react";

export default function ProfileTabs({ current }) {
    const tabs = [
        {
            name: "Information",
            href: route("profile.edit"),
            active: current === "information",
            icon: "fas fa-user",
        },
        {
            name: "Security",
            href: route("profile.security"),
            active: current === "security",
            icon: "fas fa-shield-alt",
        },
        {
            name: "Privacy",
            href: route("profile.privacy"),
            active: current === "privacy",
            icon: "fas fa-lock",
        },
        {
            name: "Preferences",
            href: route("profile.preferences"),
            active: current === "preferences",
            icon: "fas fa-cog",
        },
    ];

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    href={tab.href}
                    className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${
                            tab.active
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }
                    `}
                >
                    <i className={`${tab.icon} text-lg`} />
                    <span className="font-medium">{tab.name}</span>
                </Link>
            ))}
        </div>
    );
}
