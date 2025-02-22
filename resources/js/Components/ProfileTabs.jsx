import { Link } from "@inertiajs/react";

export default function ProfileTabs({ current }) {
    const tabs = [
        {
            name: "Information",
            href: route("profile.edit"),
            active: current === "information",
        },
        {
            name: "Security",
            href: route("profile.security"),
            active: current === "security",
        },
        {
            name: "Privacy",
            href: route("profile.privacy"),
            active: current === "privacy",
        },
        {
            name: "Preferences",
            href: route("profile.preferences"),
            active: current === "preferences",
        },
    ];

    return (
        <div className="mb-8 border-b border-zinc-800">
            <nav
                className="-mb-px flex space-x-8"
                aria-label="Profile sections"
            >
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        href={tab.href}
                        className={`
                            border-b-2 py-4 px-1 text-sm font-medium transition-colors
                            ${
                                tab.active
                                    ? "border-primary text-primary"
                                    : "border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }
                        `}
                    >
                        {tab.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
