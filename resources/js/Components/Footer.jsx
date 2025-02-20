import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import { Icon } from "@iconify/react";

const FOOTER_LINKS = {
    Resources: [
        { label: "Projects", href: "/projects" },
        {
            label: "Modrinth",
            href: "https://modrinth.com/organization/membercat",
        },
        { label: "Documentation", href: "/docs" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
    ],
    Social: [
        {
            label: "Discord",
            href: "https://discord.gg/membercat",
            icon: "fab fa-discord",
            color: "hover:text-[#5865F2]",
        },
        {
            label: "GitHub",
            href: "https://github.com/membercat-studios",
            icon: "fab fa-github",
            color: "hover:text-white",
        },
        {
            label: "Modrinth",
            href: "https://modrinth.com/organization/membercat",
            icon: "fas fa-cube",
            color: "hover:text-[#00AF5C]",
        },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-zinc-800">
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
                    <div className="col-span-2 space-y-8 md:col-span-4 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Logo className="h-8 w-8 fill-current text-primary transition-transform duration-300 hover:scale-110" />
                            <span className="text-xl font-bold text-white">
                                Membercat Studios
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-400 max-w-xs">
                            Building innovative Minecraft experiences and tools
                            for developers.
                        </p>
                        <div className="flex space-x-4">
                            {FOOTER_LINKS.Social.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-zinc-400 transition-colors duration-300 ${item.color}`}
                                >
                                    <span className="sr-only">
                                        {item.label}
                                    </span>
                                    {item.label === "Modrinth" ? (
                                        <Icon
                                            icon="simple-icons:modrinth"
                                            className="text-xl"
                                        />
                                    ) : (
                                        <i className={`${item.icon} text-xl`} />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(FOOTER_LINKS).map(
                        ([section, links]) =>
                            section !== "Social" && (
                                <div key={section} className="space-y-4">
                                    <h3 className="text-sm font-semibold text-white">
                                        {section}
                                    </h3>
                                    <ul className="space-y-3">
                                        {links.map((item) => (
                                            <li key={item.label}>
                                                <Link
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                    )}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <p className="text-sm text-zinc-400">
                        &copy; {currentYear} Membercat Studios. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
