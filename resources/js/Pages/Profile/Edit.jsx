import ProfileLayout from "@/Layouts/ProfileLayout";
import UpdateProfileInformation from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <ProfileLayout
            title="Profile Information"
            description="Update your account's profile information and email address."
            current="information"
            auth={auth}
        >
            <UpdateProfileInformation
                mustVerifyEmail={mustVerifyEmail}
                status={status}
            />
        </ProfileLayout>
    );
}
