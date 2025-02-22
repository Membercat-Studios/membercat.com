import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProfileTabs from "@/Components/ProfileTabs";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-zinc-900 shadow-sm sm:rounded-xl">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-white">
                                Profile Settings
                            </h1>
                            <p className="mt-1 text-sm text-zinc-400">
                                Manage your account settings and preferences.
                            </p>

                            <ProfileTabs current="information" />

                            <div className="max-w-xl">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
