import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-semibold text-white">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    type="password"
                    label="Current Password"
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    error={errors.current_password}
                    autoComplete="current-password"
                />

                <Input
                    id="password"
                    ref={passwordInput}
                    type="password"
                    label="New Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                    autoComplete="new-password"
                />

                <Input
                    id="password_confirmation"
                    type="password"
                    label="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                />

                <div className="flex items-center gap-4">
                    <Button
                        appearance="success"
                        type="submit"
                        disabled={processing}
                    >
                        Update Password
                    </Button>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-500">Saved.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
