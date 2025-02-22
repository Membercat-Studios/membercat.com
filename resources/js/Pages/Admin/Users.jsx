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

                <Button onClick={() => router.get(route("admin.users.create"))}>
                    <i className="fas fa-plus mr-2" />
                    Create User
                </Button>
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
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Verified
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
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getRoleBadgeClass(
                                                user.role
                                            )}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {user.verified ? (
                                            <span className="text-green-500">
                                                <i className="fas fa-check" />
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                <i className="fas fa-times" />
                                            </span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-zinc-400">
                                            {user.created_at}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap flex gap-2 px-6 py-4">
                                        <Button
                                            className="w-8 h-8"
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "admin.users.edit",
                                                        user.id
                                                    )
                                                )
                                            }
                                        >
                                            <i className="fas fa-edit"></i>
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
