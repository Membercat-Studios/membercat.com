import { Head } from "@inertiajs/react";

import ProfileLayout from "@/Layouts/ProfileLayout";

import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <ProfileLayout title="Profile">
            <div className="space-y-6">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </ProfileLayout>
    );
}
