import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProfileTabs from "@/Components/ProfileTabs";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Security() {
    return (
        <AuthenticatedLayout>
            <Head title="Security Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-zinc-900 shadow-sm sm:rounded-xl">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-white">
                                Security Settings
                            </h1>
                            <p className="mt-1 text-sm text-zinc-400">
                                Manage your password and account security.
                            </p>

                            <ProfileTabs current="security" />

                            <div className="space-y-8 max-w-xl">
                                <UpdatePasswordForm />
                                <DeleteUserForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
