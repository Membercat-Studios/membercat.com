import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";

export default function AdminLayout({ children, title }) {
    return (
        <div className="flex h-screen bg-zinc-950">
            <Sidebar>
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
                <SidebarLink href="#" active={false} icon="fas fa-rocket">
                    Projects
                </SidebarLink>
                <SidebarLink href="#" active={false} icon="fas fa-cog">
                    Settings
                </SidebarLink>
                <SidebarLink href={route("home")} icon="fas fa-home">
                    Go Home
                </SidebarLink>
            </Sidebar>

            <div className="flex-1 overflow-auto">
                <Head title={`Admin - ${title}`} />

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
