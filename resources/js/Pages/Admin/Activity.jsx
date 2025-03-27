import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "@/Layouts/AdminLayout";
import { TextSkeleton } from "@/Components/Skeletons";

export default function Activity() {
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchActivities(currentPage);
    }, [currentPage]);

    const fetchActivities = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                route("admin.activity.list", { page })
            );
            setActivities(response.data.data);
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                per_page: response.data.per_page,
                total: response.data.total,
            });
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval === 1 ? "1 year ago" : `${interval} years ago`;
        }

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval === 1 ? "1 month ago" : `${interval} months ago`;
        }

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval === 1 ? "1 day ago" : `${interval} days ago`;
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
        }

        return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`;
    };

    const getActivityIcon = (type) => {
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
    };

    const getActivityIconClass = (type) => {
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
    };

    const getBrowserInfo = (userAgent) => {
        if (!userAgent) return "Unknown";

        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
            return "Chrome";
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
            return "Safari";
        if (userAgent.includes("Edg")) return "Edge";
        if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
            return "Internet Explorer";

        return "Unknown";
    };

    return (
        <AdminLayout>
            <div className="flex-1 overflow-auto">
                <Head title="Activity Log" />

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            Activity Log
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            View all user and system activity across the
                            platform.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-lg shadow-black/10">
                        {loading ? (
                            <div className="divide-y divide-zinc-800/80">
                                {[...Array(10)].map((_, index) => (
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
                        ) : activities.length === 0 ? (
                            <div className="p-12 text-center text-zinc-500">
                                <div className="mb-3 bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <i className="fas fa-history text-2xl opacity-50"></i>
                                </div>
                                <p className="text-sm">No activity found</p>
                                <p className="text-xs mt-1 text-zinc-600">
                                    Activity will appear here as users interact
                                    with the site
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800/80">
                                {activities.map((activity) => (
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
                                                            {activity.target}
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
                                                                    User Agent:
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

                    {/* Pagination */}
                    {!loading && activities.length > 0 && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === 1
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    }`}
                                >
                                    <i className="fas fa-angle-double-left" />
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === 1
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    }`}
                                >
                                    <i className="fas fa-angle-left" />
                                </button>

                                <div className="px-4 py-1 bg-zinc-800 text-zinc-300 rounded">
                                    {currentPage} of {pagination.last_page}
                                </div>

                                <button
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage === pagination.last_page
                                    }
                                    className={`px-3 py-1 rounded ${
                                        currentPage === pagination.last_page
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    }`}
                                >
                                    <i className="fas fa-angle-right" />
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage(pagination.last_page)
                                    }
                                    disabled={
                                        currentPage === pagination.last_page
                                    }
                                    className={`px-3 py-1 rounded ${
                                        currentPage === pagination.last_page
                                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                    }`}
                                >
                                    <i className="fas fa-angle-double-right" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 text-center text-xs text-zinc-500">
                        Showing {activities.length} of {pagination.total}{" "}
                        activities
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
