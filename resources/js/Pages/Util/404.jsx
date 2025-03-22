import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";

import Button from "@/Components/Button";

export default function NotFound() {
    return (
        <>
            <Head title="Page Not Found" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <div className="mt-6 text-2xl text-white font-semibold">
                        Page Not Found
                    </div>
                    <p className="mt-4 text-zinc-400">
                        The page you are looking for doesn't exist or has been
                        moved.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            onClick={() => router.visit(route("home"))}
                            appearance="primary"
                        >
                            Back to Home
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
