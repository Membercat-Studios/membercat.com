import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";

import Button from "@/Components/Button";

export default function Unauthorized() {
    return (
        <>
            <Head title="Unauthorized" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    <h1 className="text-9xl font-bold text-primary">401</h1>
                    <div className="mt-6 text-2xl text-white font-semibold">
                        Unauthorized Access
                    </div>
                    <p className="mt-4 text-zinc-400">
                        Sorry, you don't have permission to access this page.
                        Please log in with the appropriate credentials.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            onClick={() => router.visit(route("login"))}
                            appearance="primary"
                        >
                            Sign In
                        </Button>
                        <Button
                            onClick={() => router.visit(route("home"))}
                            appearance="secondary"
                        >
                            Back to Home
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
