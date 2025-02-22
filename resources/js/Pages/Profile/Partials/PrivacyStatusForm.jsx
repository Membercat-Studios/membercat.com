import { useForm } from "@inertiajs/react";

export default function PrivacyStatusForm({ className = "", initialStatus }) {
    const { data, setData, patch, processing } = useForm({
        public_profile: initialStatus,
    });

    const updatePrivacyStatus = (e) => {
        const newStatus = e.target.checked;
        setData("public_profile", newStatus);

        patch(route("profile.update"), {
            preserveScroll: true,
            data: { public_profile: newStatus },
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-semibold text-white">
                    Privacy Settings
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                    You can change the visibility of your profile. If your
                    profile is public, other users can see your information.
                </p>
            </header>

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="public_profile"
                    checked={data.public_profile}
                    onChange={updatePrivacyStatus}
                    disabled={processing}
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-primary focus:ring-primary focus:ring-offset-zinc-900 disabled:opacity-50"
                />
                <label
                    htmlFor="public_profile"
                    className="text-sm font-medium text-zinc-200"
                >
                    Public Profile
                </label>
            </div>
        </section>
    );
}
