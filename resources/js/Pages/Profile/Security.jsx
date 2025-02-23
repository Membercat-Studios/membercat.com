import ProfileLayout from "@/Layouts/ProfileLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Security({ auth }) {
    return (
        <ProfileLayout
            title="Security Settings"
            description="Manage your account security and password settings."
            current="security"
            auth={auth}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UpdatePasswordForm />
                <DeleteUserForm />
            </div>
        </ProfileLayout>
    );
}
