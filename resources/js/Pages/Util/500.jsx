import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";

import Button from "@/Components/Button";

export default function ServerError() {
    return (
        <>
            <Head title="Server Error" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    <h1 className="text-9xl font-bold text-primary">500</h1>
                    <div className="mt-6 text-2xl text-white font-semibold">
                        Server Error
                    </div>
                    <p className="mt-4 text-zinc-400">
                        Our server encountered an unexpected error. We're
                        working on fixing it. Please try again later.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button href={route("home")} appearance="primary">
                            Back to Home
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            appearance="secondary"
                        >
                            Try Again
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
