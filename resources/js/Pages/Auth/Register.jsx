import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                    Create Account
                </h2>
                <p className="mt-2 text-zinc-400">
                    Join our community and get started today.
                </p>
            </div>

            <form onSubmit={submit}>
                <Input
                    id="name"
                    type="text"
                    label="Username"
                    error={errors.name}
                    value={data.name}
                    className="mb-4"
                    autoComplete="name"
                    isFocused={true}
                    icon="fas fa-user"
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />

                <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    error={errors.email}
                    value={data.email}
                    className="mb-4"
                    autoComplete="username"
                    icon="fas fa-envelope"
                    onChange={(e) => setData("email", e.target.value)}
                    required
                />

                <Input
                    id="password"
                    type="password"
                    label="Password"
                    error={errors.password}
                    value={data.password}
                    className="mb-4"
                    autoComplete="new-password"
                    icon="fas fa-lock"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                />

                <Input
                    id="password_confirmation"
                    type="password"
                    label="Confirm Password"
                    error={errors.password_confirmation}
                    value={data.password_confirmation}
                    className="mb-6"
                    autoComplete="new-password"
                    icon="fas fa-lock"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    required
                />

                <Button
                    appearance="primary"
                    type="submit"
                    disabled={processing}
                    loading={processing}
                    fullWidth
                    size="lg"
                    icon="fas fa-user-plus"
                >
                    Register
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
                    Already have an account?{" "}
                    <Link
                        href={route("login")}
                        className="text-primary hover:text-primary/80"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
