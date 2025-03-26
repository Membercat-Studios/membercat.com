import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "@/Components/Sidebar/Sidebar";
import SidebarLink from "@/Components/Sidebar/SidebarLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { CardSkeleton, TextSkeleton } from "@/Components/Skeletons";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProjects: 0,
        activeUsers: 0,
        newUsers: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [
                    userCountResponse,
                    activityResponse,
                    projectCountResponse,
                ] = await Promise.all([
                    axios.get(route("admin.users.user-count")),
                    axios.get(route("admin.activity.recent")),
                    axios.get(route("modrinth.project-count")),
                ]);

                setStats((prevStats) => ({
                    ...prevStats,
                    totalUsers: userCountResponse.data,
                    totalProjects: projectCountResponse.data,
                }));

                setRecentActivity(activityResponse.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchDashboardData();
    }, []);

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

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
                            Welcome to the admin dashboard. Here's what's going
                            on with Membercat Studios.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {loading ? (
                            <>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-semibold text-white">
                                <i className="fas fa-history mr-2 text-primary/70"></i>
                                Recent Activity
                            </h2>
                            {!loading && recentActivity.length > 0 && (
                                <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center">
                                    <span>View all activity</span>
                                    <i className="fas fa-chevron-right ml-1 text-[10px]"></i>
                                </button>
                            )}
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-lg shadow-black/10">
                            {loading ? (
                                <div className="divide-y divide-zinc-800/80">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex items-start">
                                                <div className="rounded-full bg-zinc-800/50 w-10 h-10 flex items-center justify-center animate-pulse"></div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <TextSkeleton
                                                            width="w-3/4"
                                                            height="h-4"
                                                        />
                                                        <TextSkeleton
                                                            width="w-20"
                                                            height="h-3"
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <TextSkeleton
                                                            width="w-1/4"
                                                            height="h-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : recentActivity.length === 0 ? (
                                <div className="p-12 text-center text-zinc-500">
                                    <div className="mb-3 bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                        <i className="fas fa-history text-2xl opacity-50"></i>
                                    </div>
                                    <p className="text-sm">
                                        No recent activity found
                                    </p>
                                    <p className="text-xs mt-1 text-zinc-600">
                                        Activity will appear here as users
                                        interact with the site
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-zinc-800/80">
                                    {recentActivity.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex items-start p-4 hover:bg-zinc-800/20 transition-colors duration-150"
                                        >
                                            <div
                                                className={`rounded-full p-2.5 ${getActivityIconClass(
                                                    activity.type
                                                )} mt-0.5`}
                                            >
                                                <i
                                                    className={getActivityIcon(
                                                        activity.type
                                                    )}
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 flex justify-between">
                                                <div className="flex-1 pr-4">
                                                    <p className="text-sm text-white leading-snug">
                                                        <span className="font-medium text-primary">
                                                            {activity.user_name}
                                                        </span>{" "}
                                                        <span className="text-zinc-300">
                                                            {activity.action}
                                                        </span>{" "}
                                                        {activity.target && (
                                                            <span className="text-zinc-400">
                                                                {
                                                                    activity.target
                                                                }
                                                            </span>
                                                        )}
                                                    </p>
                                                    <div className="flex items-center mt-2 flex-wrap gap-2">
                                                        <p className="text-xs text-zinc-500 flex items-center">
                                                            <i className="fas fa-clock mr-1.5 text-zinc-600"></i>
                                                            <span
                                                                title={new Date(
                                                                    activity.created_at
                                                                ).toLocaleString()}
                                                                className="hover:text-zinc-400 transition-colors cursor-help"
                                                            >
                                                                {formatTimeAgo(
                                                                    activity.created_at
                                                                )}
                                                            </span>
                                                        </p>
                                                        {activity.type && (
                                                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-800 text-zinc-400 uppercase tracking-wide font-medium">
                                                                {activity.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-2 min-w-[140px] justify-center">
                                                    {activity.ip_address && (
                                                        <div className="group relative">
                                                            <span className="text-xs text-zinc-500 bg-zinc-800/70 px-2 py-0.5 rounded blur-[3px] group-hover:blur-none transition-all duration-200 cursor-default font-mono">
                                                                {
                                                                    activity.ip_address
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                    {activity.user_agent && (
                                                        <div className="group relative">
                                                            <span className="text-xs text-zinc-600 flex items-center cursor-help hover:text-zinc-400 transition-colors">
                                                                <i className="fas fa-desktop mr-1.5"></i>
                                                                <span className="truncate max-w-[100px] xl:max-w-[200px]">
                                                                    {getBrowserInfo(
                                                                        activity.user_agent
                                                                    )}
                                                                </span>
                                                            </span>
                                                            <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-zinc-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-xs text-zinc-300 z-50 border border-zinc-700/50">
                                                                <p className="mb-2 pb-2 border-b border-zinc-700">
                                                                    <span className="font-semibold">
                                                                        Browser:
                                                                    </span>{" "}
                                                                    {getBrowserInfo(
                                                                        activity.user_agent
                                                                    )}
                                                                </p>
                                                                <p className="break-words">
                                                                    <span className="font-semibold">
                                                                        User
                                                                        Agent:
                                                                    </span>{" "}
                                                                    <span className="text-zinc-400 font-mono text-[10px] leading-relaxed block mt-1">
                                                                        {
                                                                            activity.user_agent
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getActivityIcon(type) {
    switch (type) {
        case "registration":
            return "fas fa-user-plus text-purple-400";
        case "login":
            return "fas fa-sign-in-alt text-blue-400";
        case "project_view":
            return "fas fa-eye text-green-400";
        case "project_click":
            return "fas fa-external-link-alt text-yellow-400";
        case "search":
            return "fas fa-search text-indigo-400";
        case "authentication":
            return "fas fa-shield-alt text-teal-400";
        case "admin_action":
            return "fas fa-user-shield text-red-400";
        default:
            return "fas fa-history text-zinc-400";
    }
}

function getActivityIconClass(type) {
    switch (type) {
        case "registration":
            return "bg-purple-500/10";
        case "login":
            return "bg-blue-500/10";
        case "project_view":
            return "bg-green-500/10";
        case "project_click":
            return "bg-yellow-500/10";
        case "search":
            return "bg-indigo-500/10";
        case "authentication":
            return "bg-teal-500/10";
        case "admin_action":
            return "bg-red-500/10";
        default:
            return "bg-zinc-800";
    }
}

function getBrowserInfo(userAgent) {
    if (!userAgent) return "Unknown";

    // Extract browser name and version
    let browser = "Unknown";

    if (userAgent.includes("Firefox")) {
        browser = "Firefox";
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        browser = "Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browser = "Safari";
    } else if (userAgent.includes("Edg")) {
        browser = "Edge";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
        browser = "Internet Explorer";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        browser = "Opera";
    }

    // Extract OS
    let os = "Unknown";

    if (userAgent.includes("Windows")) {
        os = "Windows";
    } else if (userAgent.includes("Mac OS")) {
        os = "macOS";
    } else if (userAgent.includes("Linux")) {
        os = "Linux";
    } else if (userAgent.includes("Android")) {
        os = "Android";
    } else if (
        userAgent.includes("iOS") ||
        userAgent.includes("iPhone") ||
        userAgent.includes("iPad")
    ) {
        os = "iOS";
    }

    return `${browser} / ${os}`;
}
