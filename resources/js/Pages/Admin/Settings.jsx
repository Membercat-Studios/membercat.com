import { Head } from "@inertiajs/react";
import { useState } from "react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <AdminLayout title="Settings">
            <p className="mt-2 text-zinc-400">
                Manage your site settings and configuration.
            </p>

            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <div className="flex items-center">
                    <div className="rounded-lg bg-red-500/20 p-3 mr-4">
                        <i className="fas fa-exclamation-triangle text-xl text-red-500"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Development in Progress
                        </h3>
                        <p className="text-zinc-400">
                            This settings page is currently under active
                            development and does not have any functional
                            features yet.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Settings
                        </h2>

                        <nav className="flex flex-col space-y-1">
                            <button
                                onClick={() => setActiveTab("general")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "general"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-sliders-h w-5 text-center mr-3"></i>
                                <span>General</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("appearance")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "appearance"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-palette w-5 text-center mr-3"></i>
                                <span>Appearance</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("users")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "users"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-users w-5 text-center mr-3"></i>
                                <span>User Defaults</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("security")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "security"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-shield-alt w-5 text-center mr-3"></i>
                                <span>Security</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("integrations")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "integrations"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-plug w-5 text-center mr-3"></i>
                                <span>Integrations</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("email")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "email"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-envelope w-5 text-center mr-3"></i>
                                <span>Email</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("advanced")}
                                className={`flex items-center px-4 py-3 rounded-lg text-left transition ${
                                    activeTab === "advanced"
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                <i className="fas fa-code w-5 text-center mr-3"></i>
                                <span>Advanced</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                                <div className="border-b border-zinc-800 bg-zinc-800/30 px-5 py-4">
                                    <h3 className="font-medium text-white">
                                        Site Information
                                    </h3>
                                </div>
                                <div className="p-5 space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                                            Site Name
                                        </label>
                                        <Input
                                            type="text"
                                            defaultValue="My Platform"
                                            className="w-full max-w-md"
                                        />
                                        <p className="mt-1 text-xs text-zinc-500">
                                            This will be displayed in the
                                            browser tab and in emails
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                                            Site Description
                                        </label>
                                        <Input
                                            type="text"
                                            defaultValue="A powerful platform for managing projects and teams"
                                            className="w-full max-w-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                                            Admin Email
                                        </label>
                                        <Input
                                            type="email"
                                            defaultValue="admin@example.com"
                                            className="w-full max-w-md"
                                        />
                                        <p className="mt-1 text-xs text-zinc-500">
                                            System notifications will be sent to
                                            this address
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                                <div className="border-b border-zinc-800 bg-zinc-800/30 px-5 py-4">
                                    <h3 className="font-medium text-white">
                                        Regional Settings
                                    </h3>
                                </div>
                                <div className="p-5 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                                Timezone
                                            </label>
                                            <select className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                                                <option>UTC</option>
                                                <option>
                                                    America/New_York
                                                </option>
                                                <option>Europe/London</option>
                                                <option>Asia/Tokyo</option>
                                                <option>
                                                    Australia/Sydney
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">
                                                Date Format
                                            </label>
                                            <select className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                                                <option>MM/DD/YYYY</option>
                                                <option>DD/MM/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                                <div className="border-b border-zinc-800 bg-zinc-800/30 px-5 py-4">
                                    <h3 className="font-medium text-white">
                                        Content Settings
                                    </h3>
                                </div>
                                <div className="p-5 space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                                            Items Per Page
                                        </label>
                                        <select className="w-full max-w-xs rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                                            <option>10</option>
                                            <option>25</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="enable-comments"
                                            className="rounded border-zinc-700 bg-zinc-800 text-primary focus:ring-primary/20"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="enable-comments"
                                            className="ml-2 text-zinc-400"
                                        >
                                            Enable comments on all content
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "appearance" && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                                <div className="border-b border-zinc-800 bg-zinc-800/30 px-5 py-4">
                                    <h3 className="font-medium text-white">
                                        Theme Settings
                                    </h3>
                                </div>
                                <div className="p-5">
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">
                                            Primary Color
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                "bg-indigo-500",
                                                "bg-blue-500",
                                                "bg-green-500",
                                                "bg-purple-500",
                                                "bg-pink-500",
                                                "bg-orange-500",
                                            ].map((color) => (
                                                <button
                                                    key={color}
                                                    className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-offset-zinc-900 ${
                                                        color ===
                                                        "bg-indigo-500"
                                                            ? "ring-white"
                                                            : "ring-transparent"
                                                    }`}
                                                    aria-label={`Select ${color
                                                        .replace("bg-", "")
                                                        .replace(
                                                            "-500",
                                                            ""
                                                        )} color`}
                                                ></button>
                                            ))}

                                            <button className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white">
                                                <i className="fas fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">
                                            Site Theme
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="border-2 border-primary rounded-xl p-3 bg-zinc-900/50">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-white font-medium">
                                                        Dark Theme
                                                    </span>
                                                    <i className="fas fa-check text-primary"></i>
                                                </div>
                                                <div className="h-24 rounded-lg overflow-hidden flex flex-col">
                                                    <div className="h-6 bg-zinc-800"></div>
                                                    <div className="flex-1 flex">
                                                        <div className="w-1/4 bg-zinc-900"></div>
                                                        <div className="w-3/4 bg-zinc-950 p-2">
                                                            <div className="w-full h-4 bg-zinc-900 rounded mb-2"></div>
                                                            <div className="w-2/3 h-4 bg-zinc-900 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-zinc-700 rounded-xl p-3 bg-zinc-900/50 hover:border-zinc-600 transition">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="text-white font-medium">
                                                        Light Theme
                                                    </span>
                                                </div>
                                                <div className="h-24 rounded-lg overflow-hidden flex flex-col">
                                                    <div className="h-6 bg-gray-200"></div>
                                                    <div className="flex-1 flex">
                                                        <div className="w-1/4 bg-gray-100"></div>
                                                        <div className="w-3/4 bg-white p-2">
                                                            <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                                                            <div className="w-2/3 h-4 bg-gray-100 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                                <div className="border-b border-zinc-800 bg-zinc-800/30 px-5 py-4">
                                    <h3 className="font-medium text-white">
                                        Logo & Branding
                                    </h3>
                                </div>
                                <div className="p-5 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">
                                            Site Logo
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center">
                                                <i className="fas fa-rocket text-2xl text-primary"></i>
                                            </div>
                                            <Button
                                                type="button"
                                                className="!bg-zinc-800 hover:!bg-zinc-700"
                                            >
                                                <i className="fas fa-upload mr-2"></i>
                                                Upload Logo
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-3">
                                            Favicon
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-zinc-800/80 border border-zinc-700 flex items-center justify-center">
                                                <i className="fas fa-rocket text-sm text-primary"></i>
                                            </div>
                                            <Button
                                                type="button"
                                                className="!bg-zinc-800 hover:!bg-zinc-700"
                                            >
                                                <i className="fas fa-upload mr-2"></i>
                                                Upload Favicon
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== "general" && activeTab !== "appearance" && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                            <div className="py-16 px-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/80 mb-4">
                                    <i className="fas fa-tools text-2xl text-zinc-500"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    This section is under development
                                </h3>
                                <p className="text-zinc-400 max-w-md mx-auto">
                                    The{" "}
                                    {activeTab.charAt(0).toUpperCase() +
                                        activeTab.slice(1)}{" "}
                                    settings module is currently being built and
                                    will be available in a future update.
                                </p>
                                <Button
                                    type="button"
                                    className="mt-6 !bg-zinc-800 hover:!bg-zinc-700"
                                >
                                    <i className="fas fa-bell mr-2"></i>
                                    Notify Me When Available
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            className="!bg-zinc-800 hover:!bg-zinc-700"
                        >
                            Cancel
                        </Button>
                        <Button type="button" icon="fas fa-save">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
