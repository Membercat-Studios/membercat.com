import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";

import Button from "@/Components/Button";

export default function Forbidden() {
    return (
        <>
            <Head title="Forbidden" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    <h1 className="text-9xl font-bold text-primary">403</h1>
                    <div className="mt-6 text-2xl text-white font-semibold">
                        Access Forbidden
                    </div>
                    <p className="mt-4 text-zinc-400">
                        Sorry, you don't have permission to access this
                        resource. If you believe this is an error, please
                        contact the administrator.
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
