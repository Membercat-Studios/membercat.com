import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-semibold text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <Input
                    id="name"
                    label="Name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    error={errors.name}
                    required
                    isFocused
                    autoComplete="name"
                />

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                    required
                    autoComplete="username"
                />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-zinc-400">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ml-2 text-primary hover:text-primary/80 underline"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-500">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button
                        appearance="success"
                        type="submit"
                        disabled={processing}
                        loading={processing}
                    >
                        Save Changes
                    </Button>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-500">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
