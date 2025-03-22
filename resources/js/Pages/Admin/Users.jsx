import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Users({ users }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = role === "all" || user.role === role;
        return matchesSearch && matchesRole;
    });

    const handleDelete = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("admin.users.destroy", userId));
        }
    };

    const handleToggleAdmin = (user) => {
        if (user.role === "admin") {
            if (user.id === auth.user.id) {
                alert("You cannot remove your own admin privileges.");
                return;
            }

            if (
                confirm(
                    "Are you sure you want to remove admin privileges from this user?"
                )
            ) {
                router.post(route("admin.users.remove-admin", user.id));
            }
        } else {
            if (confirm("Are you sure you want to make this user an admin?")) {
                router.post(route("admin.users.make-admin", user.id));
            }
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case "admin":
                return "bg-red-500/10 text-red-500";
            case "mod":
                return "bg-yellow-500/10 text-yellow-500";
            default:
                return "bg-blue-500/10 text-blue-500";
        }
    };

    const canDeleteUser = (user) => {
        return user.id !== auth.user.id && user.role !== "admin";
    };

    return (
        <AdminLayout title="Users">
            <p className="mt-2 text-zinc-400">
                Manage your users and their permissions.
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Input
                        type="search"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                        icon="fas fa-search"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="mod">Moderators</option>
                        <option value="user">Users</option>
                    </select>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Discord
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-white">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-zinc-400">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {user.discord_id ? (
                                            <div className="text-sm text-zinc-400">
                                                <div className="font-medium text-[#5865F2]">
                                                    {user.discord_username}
                                                </div>
                                                <div className="text-xs">
                                                    ID: {user.discord_id}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-zinc-500 italic">
                                                Not connected
                                            </div>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getRoleBadgeClass(
                                                user.role
                                            )}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-zinc-400">
                                            {user.created_at}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap flex gap-2 px-6 py-4">
                                        <Button
                                            className={`w-8 h-8 ${
                                                user.role === "admin"
                                                    ? "!bg-red-500 !text-white"
                                                    : "!bg-yellow-500 !text-white"
                                            }`}
                                            onClick={() =>
                                                handleToggleAdmin(user)
                                            }
                                            title={
                                                user.role === "admin"
                                                    ? user.id === auth.user.id
                                                        ? "Cannot remove your own admin privileges"
                                                        : "Remove admin privileges"
                                                    : "Make user an admin"
                                            }
                                            disabled={
                                                user.role === "admin" &&
                                                user.id === auth.user.id
                                            }
                                        >
                                            <i
                                                className={`fas ${
                                                    user.role === "admin"
                                                        ? "fa-user-minus"
                                                        : "fa-shield"
                                                }`}
                                            ></i>
                                        </Button>
                                        <Button
                                            className="w-8 h-8 !bg-red-500 !text-white"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            disabled={!canDeleteUser(user)}
                                            title={
                                                !canDeleteUser(user)
                                                    ? "Cannot delete admin accounts or your own account"
                                                    : "Delete user"
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
