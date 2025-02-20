import { Head } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";

export default function Dashboard() {
    const [stats] = useState({
        totalUsers: 1234,
        totalProjects: 56,
        activeUsers: 789,
        newUsers: 123,
    });

    const [recentActivity] = useState([
        {
            id: 1,
            user: "John Doe",
            action: "Created new project",
            project: "Awesome Plugin",
            time: "2 hours ago",
        },
    ]);

    return (
        <div className="flex h-screen bg-zinc-950">
            <Sidebar>
                <SidebarLink href={{}} active={true} icon="fas fa-chart-line">
                    Dashboard
                </SidebarLink>
                <SidebarLink href={{}} active={false} icon="fas fa-users">
                    Users
                </SidebarLink>
                <SidebarLink href={{}} active={false} icon="fas fa-rocket">
                    Projects
                </SidebarLink>
                <SidebarLink href={{}} active={false} icon="fas fa-cog">
                    Settings
                </SidebarLink>
                <SidebarLink
                    href={route("home")}
                    active={false}
                    icon="fas fa-sign-out-alt"
                >
                    Return Home
                </SidebarLink>
            </Sidebar>

            <div className="flex-1 overflow-auto">
                <Head title="Admin Dashboard" />

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            Welcome to the admin dashboard. Here's what's
                            happening with your site.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <i className="fas fa-users text-xl text-primary" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-zinc-400">
                                        Total Users
                                    </p>
                                    <p className="text-2xl font-semibold text-white">
                                        {stats.totalUsers}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-green-500/10 p-3">
                                    <i className="fas fa-rocket text-xl text-green-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-zinc-400">
                                        Total Projects
                                    </p>
                                    <p className="text-2xl font-semibold text-white">
                                        {stats.totalProjects}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-blue-500/10 p-3">
                                    <i className="fas fa-user-check text-xl text-blue-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-zinc-400">
                                        Active Users
                                    </p>
                                    <p className="text-2xl font-semibold text-white">
                                        {stats.activeUsers}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-purple-500/10 p-3">
                                    <i className="fas fa-user-plus text-xl text-purple-500" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-zinc-400">
                                        New Users
                                    </p>
                                    <p className="text-2xl font-semibold text-white">
                                        {stats.newUsers}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8">
                        <h2 className="mb-4 text-xl font-semibold text-white">
                            Recent Activity
                        </h2>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
                            <div className="divide-y divide-zinc-800">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center p-4"
                                    >
                                        <div className="rounded-full bg-zinc-800 p-2">
                                            <i className="fas fa-user text-zinc-400" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm text-white">
                                                <span className="font-medium text-primary">
                                                    {activity.user}
                                                </span>{" "}
                                                {activity.action}:{" "}
                                                <span className="text-zinc-400">
                                                    {activity.project}
                                                </span>
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
