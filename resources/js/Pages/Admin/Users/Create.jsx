import { useForm } from "@inertiajs/react";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.users.store"));
    };

    return (
        <AdminLayout title="Create User">
            <p className="mt-2 text-zinc-400">Create a new user account.</p>

            <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                <Input
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                    required
                />

                <Input
                    type="email"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                    required
                />

                <Input
                    type="password"
                    label="Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                    required
                />

                <Input
                    type="password"
                    label="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    error={errors.password_confirmation}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-white">
                        Role
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="user">User</option>
                        <option value="mod">Moderator</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        appearance="success"
                        type="submit"
                        disabled={processing}
                        loading={processing}
                    >
                        Create User
                    </Button>

                    <Button
                        appearance="text"
                        href={route("admin.users")}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
