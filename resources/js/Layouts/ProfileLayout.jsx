import { Head } from "@inertiajs/react";

import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";

export default function ProfileLayout({ children, title }) {
    return (
        <div className="flex h-screen bg-zinc-950">
            <Sidebar>
                <SidebarLink
                    href={route("profile.edit")}
                    active={route().current("profile.edit")}
                    icon="fas fa-user"
                >
                    Profile Information
                </SidebarLink>
                <SidebarLink
                    href={route("settings")}
                    active={route().current("settings")}
                    icon="fas fa-gear"
                >
                    Settings
                </SidebarLink>
                <SidebarLink
                    href={route("home")}
                    active={false}
                    icon="fas fa-house"
                >
                    Return Home
                </SidebarLink>
            </Sidebar>

            <div className="flex-1 overflow-auto">
                <Head title={`Profile - ${title}`} />

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            {title}
                        </h1>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
