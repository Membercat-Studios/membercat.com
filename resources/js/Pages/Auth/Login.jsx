import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login({ status }) {
    return (
        <GuestLayout>
            <Head title="Sign In" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome</h2>
                <p className="mt-2 text-zinc-400">
                    Sign in or create an account using your favorite platform.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-green-500/10 p-4 text-sm font-medium text-green-500">
                    <i className="fas fa-check-circle mr-2"></i>
                    {status}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                <a
                    href={route("discord.redirect")}
                    className="flex items-center justify-center space-x-3 rounded-xl bg-[#5865F2]/10 px-4 py-3.5 text-[#5865F2] transition-all duration-300 hover:bg-[#5865F2] hover:text-white"
                >
                    <i className="fab fa-discord text-xl"></i>
                    <span className="font-medium">Continue with Discord</span>
                </a>
                <a
                    href={route("github.redirect")}
                    className="flex items-center justify-center space-x-3 rounded-xl bg-zinc-800/50 px-4 py-3.5 text-zinc-300 transition-all duration-300 hover:bg-zinc-700 hover:text-white"
                >
                    <i className="fab fa-github text-xl"></i>
                    <span className="font-medium">Continue with GitHub</span>
                </a>
            </div>
        </GuestLayout>
    );
}
