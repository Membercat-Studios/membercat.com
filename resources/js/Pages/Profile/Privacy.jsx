import ProfileLayout from "@/Layouts/ProfileLayout";
import PrivacyStatusForm from "./Partials/PrivacyStatusForm";

export default function Privacy({ auth }) {
    return (
        <ProfileLayout
            title="Privacy Settings"
            description="Control your profile visibility and privacy preferences."
            current="privacy"
            auth={auth}
        >
            <PrivacyStatusForm initialStatus={auth.user.public_profile} />
        </ProfileLayout>
    );
}
