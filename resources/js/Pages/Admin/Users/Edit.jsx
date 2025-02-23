import { useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";
import Gravatar from "@/Components/Gravatar";

export default function Edit({ user }) {
    const [showSaved, setShowSaved] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        role: user.role,
        status: user.status || "offline",
        public_profile: user.public_profile || false,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 3000);
            },
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "online":
                return "text-green-500";
            case "idle":
                return "text-yellow-500";
            case "do not disturb":
                return "text-red-500";
            default:
                return "text-zinc-500";
        }
    };

    return (
        <AdminLayout title="Edit User">
            <div className="space-y-6 mt-4">
                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-primary overflow-hidden">
                            <Gravatar
                                email={data.email}
                                size={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-white">
                                {data.name}
                            </h2>
                            <p className="text-zinc-400">{data.email}</p>
                            <div className="mt-2 flex items-center gap-4">
                                <div
                                    className={`flex items-center gap-2 ${getStatusColor(
                                        data.status
                                    )}`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                    <span className="capitalize">
                                        {data.status}
                                    </span>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                    {data.role.charAt(0).toUpperCase() +
                                        data.role.slice(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                            <h3 className="text-lg font-medium text-white mb-4">
                                Basic Information
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    label="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    error={errors.name}
                                    required
                                />
                                <Input
                                    type="email"
                                    label="Email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    error={errors.email}
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                            <h3 className="text-lg font-medium text-white mb-4">
                                Security
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    type="password"
                                    label="New Password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    error={errors.password}
                                    helperText="Leave blank to keep current password"
                                />
                                <Input
                                    type="password"
                                    label="Confirm New Password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    error={errors.password_confirmation}
                                />
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                            <h3 className="text-lg font-medium text-white mb-4">
                                Permissions
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    type="select"
                                    label="Role"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    options={[
                                        { value: "user", label: "User" },
                                        { value: "mod", label: "Moderator" },
                                        {
                                            value: "admin",
                                            label: "Administrator",
                                        },
                                    ]}
                                />

                                <Input
                                    type="checkbox"
                                    id="public_profile"
                                    label="Public Profile"
                                    checked={data.public_profile}
                                    onChange={(e) =>
                                        setData(
                                            "public_profile",
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                            <h3 className="text-lg font-medium text-white mb-4">
                                Status
                            </h3>
                            <div>
                                <Input
                                    type="select"
                                    label="Current Status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    options={[
                                        { value: "online", label: "Online" },
                                        { value: "idle", label: "Idle" },
                                        {
                                            value: "do not disturb",
                                            label: "Do Not Disturb",
                                        },
                                        { value: "offline", label: "Offline" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <Button
                            appearance="success"
                            type="submit"
                            disabled={processing}
                            loading={processing}
                        >
                            Save Changes
                        </Button>

                        {showSaved && (
                            <div className="text-green-500 text-sm">Saved.</div>
                        )}

                        <Button
                            appearance="text"
                            onClick={() => router.get(route("admin.users"))}
                            disabled={processing}
                        >
                            Back to Users
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
