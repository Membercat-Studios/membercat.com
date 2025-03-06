import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";

import Logo from "@/Components/Logo";

export default function GuestLayout({ children }) {
    const socialLinks = [
        {
            name: "Discord Community",
            description: "Join our Discord server",
            icon: "fab fa-discord",
            href: "https://dc.kasai.gg",
            iconBg: "bg-[#5865F2]/10",
            iconColor: "text-[#5865F2]",
        },
        {
            name: "Modrinth",
            description: "Browse our resources",
            icon: "fas fa-cube",
            href: "https://modrinth.com/organization/membercat",
            iconBg: "bg-[#00AF5C]/10",
            iconColor: "text-[#00AF5C]",
        },
        {
            name: "Website",
            description: "Back to homepage",
            icon: "fas fa-globe",
            href: "/",
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
        },
        {
            name: "GitHub",
            description: "View our source code",
            icon: "fab fa-github",
            href: "https://github.com/membercat-studios",
            iconBg: "bg-zinc-700/10",
            iconColor: "text-zinc-400",
        },
    ];

    return (
        <div className="flex min-h-screen">
            <div className="flex w-full flex-col justify-center bg-black px-6 lg:w-[600px]">
                <div className="mx-auto w-full max-w-[420px]">
                    <Link
                        href="/"
                        className="mb-8 flex items-center space-x-3.5 group"
                    >
                        <div className="relative flex items-center space-x-3 overflow-hidden rounded-xl transition-all duration-300">
                            <Logo className="h-12 w-12 fill-current text-white transform group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-lg font-bold text-white transition-all duration-300">
                                Membercat Studios
                            </span>
                        </div>
                    </Link>
                    {children}
                </div>
            </div>

            <div className="hidden flex-grow min-h-screen relative lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90">
                    <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] [background-size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center p-20">
                    <div className="max-w-2xl w-full space-y-20">
                        <div className="text-center space-y-6">
                            <h2 className="text-5xl font-bold text-primary">
                                Join our growing community
                            </h2>
                            <p className="text-xl text-zinc-400 max-w-lg mx-auto">
                                Connect with us across our platforms
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 px-8">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group p-6 bg-zinc-900/50 rounded-xl border border-zinc-700/75 hover:border-zinc-600 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`p-3 rounded-lg ${link.iconBg} ${link.iconColor}`}
                                        >
                                            {link.name === "Modrinth" ? (
                                                <Icon
                                                    icon="simple-icons:modrinth"
                                                    className="text-2xl"
                                                />
                                            ) : (
                                                <i
                                                    className={`${link.icon} text-2xl`}
                                                ></i>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                                {link.name}
                                            </h3>
                                            <p className="text-sm text-zinc-400">
                                                {link.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center text-sm text-zinc-500">
                            Join a passionate community of Minecraft enthusiasts
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
