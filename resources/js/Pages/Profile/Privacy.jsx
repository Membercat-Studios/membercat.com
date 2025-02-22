import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProfileTabs from "@/Components/ProfileTabs";
import PrivacyStatusForm from "./Partials/PrivacyStatusForm";

export default function Privacy({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Privacy Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-zinc-900 shadow-sm sm:rounded-xl">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold text-white">
                                Privacy Settings
                            </h1>
                            <p className="mt-1 text-sm text-zinc-400">
                                Control your profile visibility and privacy
                                options.
                            </p>

                            <ProfileTabs current="privacy" />

                            <div className="max-w-xl">
                                <PrivacyStatusForm
                                    initialStatus={auth.user.public_profile}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
