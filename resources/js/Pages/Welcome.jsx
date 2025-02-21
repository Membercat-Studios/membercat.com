import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";

export default function Welcome({
    auth,
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topProjects, setTopProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                // TODO: implement api calls
                const response = await fetch("/api/projects/featured");
                const data = await response.json();
                setTopProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const scrollToProjects = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <>
            <Head title={auth.user ? "Welcome Back" : "Welcome"} />

            <main className="flex flex-col min-h-screen bg-black">
                <Navbar />

                <section className="relative min-h-screen flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950">
                        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] [background-size:40px_40px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                    </div>

                    <div className="container relative mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-12">
                            <div className="text-center space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                    Welcome to{" "}
                                    <span className="text-primary">
                                        Membercat Studios
                                    </span>
                                </h1>

                                {auth.user ? (
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/80">
                                        Welcome back,{" "}
                                        <span className="text-white font-bold">
                                            {auth.user.name}
                                        </span>
                                    </h2>
                                ) : (
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/80">
                                        Build Something Amazing
                                    </h2>
                                )}

                                <p className="text-xl text-white/60 max-w-3xl mx-auto">
                                    Innovative Minecraft experiences crafted by
                                    passionate developers.
                                </p>
                            </div>

                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        className="w-full px-6 py-4 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <i className="fas fa-search absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Button
                                    appearance="primary"
                                    size="lg"
                                    icon="fas fa-rocket"
                                    onClick={() => {
                                        window.location.href = "/projects";
                                    }}
                                >
                                    Browse Projects
                                </Button>
                                <Button
                                    appearance="text"
                                    size="lg"
                                    onClick={() => {
                                        window.location.href = "/projects";
                                    }}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        onClick={scrollToProjects}
                        className="
                            h-8 w-8
                            absolute 
                            bottom-8
                            left-1/2 
                            -translate-x-1/2
                            text-white/50
                            hover:text-primary
                            transition-colors
                            animate-bounce
                            z-10
                        "
                        aria-label="Scroll to projects"
                    >
                        <i className="fas fa-chevron-down text-md text-white" />
                    </Button>
                </section>

                <section className="relative bg-black py-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-zinc-900/10" />

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-16">
                            Failed to load projects
                        </div>
                    ) : (
                        <div className="container mx-auto px-4">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-8">
                                    Featured Projects
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {topProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="rounded-xl bg-zinc-800 border border-zinc-700 p-6"
                                        >
                                            {/* TODO: add project card content */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <Footer />
            </main>
        </>
    );
}
