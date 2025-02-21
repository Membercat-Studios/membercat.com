import { Head, Link, useForm } from "@inertiajs/react";

import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Sign In</h2>
                <p className="mt-2 text-zinc-400">
                    Welcome back! Please enter your details.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-500/10 p-4 text-sm font-medium text-green-500">
                    <i className="fas fa-check-circle mr-2"></i>
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    error={errors.email}
                    value={data.email}
                    className="mb-4"
                    autoComplete="username"
                    isFocused={true}
                    icon="fas fa-envelope"
                    onChange={(e) => setData("email", e.target.value)}
                />

                <Input
                    id="password"
                    type="password"
                    label="Password"
                    error={errors.password}
                    value={data.password}
                    className="mb-4"
                    autoComplete="current-password"
                    icon="fas fa-lock"
                    onChange={(e) => setData("password", e.target.value)}
                />

                <div className="mb-6 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-zinc-400">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-300 hover:text-gray-200"
                        >
                            <i className="fas fa-key mr-1 text-xs"></i>
                            Forgot password?
                        </Link>
                    )}
                </div>

                <Button
                    appearance="primary"
                    type="submit"
                    disabled={processing}
                    loading={processing}
                    fullWidth
                    size="lg"
                    icon="fas fa-sign-in-alt"
                >
                    Sign in
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-700/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-black px-4 text-zinc-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href={route("discord.redirect")}
                        className="flex items-center justify-center space-x-2 rounded-xl bg-[#5865F2]/10 px-4 py-2.5 text-[#5865F2] transition-all duration-300 hover:bg-[#5865F2] hover:text-white"
                    >
                        <i className="fab fa-discord text-lg"></i>
                        <span>Discord</span>
                    </Link>
                    <Link
                        href={route("github.redirect")}
                        className="flex items-center justify-center space-x-2 rounded-xl bg-zinc-800/50 px-4 py-2.5 text-zinc-300 transition-all duration-300 hover:bg-zinc-700 hover:text-white"
                    >
                        <i className="fab fa-github text-lg"></i>
                        <span>GitHub</span>
                    </Link>
                </div>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        className="text-primary hover:text-primary/80"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
