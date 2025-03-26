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
        </AdminLayout>
    );
}
