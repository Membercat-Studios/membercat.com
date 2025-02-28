import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Search from "@/Components/Search";

export default function Welcome({ auth }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topProjects, setTopProjects] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(route("modrinth.top-projects"));
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setTopProjects(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const formatDownloads = (downloads) => {
        if (downloads >= 1000000) {
            return `${(downloads / 1000000).toFixed(1)}M`;
        } else if (downloads >= 1000) {
            return `${(downloads / 1000).toFixed(1)}K`;
        }
        return downloads.toString();
    };

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

                            <Search
                                isOpen={isSearchOpen}
                                setIsOpen={setIsSearchOpen}
                            />

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
                                    onClick={() => setIsSearchOpen(true)}
                                    icon="fas fa-search"
                                >
                                    Search Projects
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
                    <div className="absolute inset-0" />

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-16">
                            {error}
                        </div>
                    ) : (
                        <div className="container mx-auto px-4">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-8">
                                    Featured Projects
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {topProjects.map((project) => (
                                        <a
                                            href={`https://modrinth.com/project/${project.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={project.id}
                                            className="rounded-xl bg-zinc-900/50 h-full backdrop-blur-sm border border-zinc-800 p-8 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            <div className="flex items-start gap-6">
                                                {project.icon ? (
                                                    <img
                                                        src={project.icon}
                                                        alt={project.name}
                                                        className="w-20 h-20 rounded-xl object-cover shadow-lg group-hover:shadow-primary/10 transition-all duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 rounded-xl bg-zinc-800 flex items-center justify-center shadow-lg">
                                                        <i className="fas fa-cube text-3xl text-zinc-500" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors truncate">
                                                        {project.name}
                                                    </h3>
                                                    <p className="text-zinc-300 mt-2 line-clamp-2 text-sm leading-relaxed">
                                                        {project.summary}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                {project.categories
                                                    .slice(0, 3)
                                                    .map((category, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm text-xs font-medium text-zinc-300"
                                                        >
                                                            {category
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                category.slice(
                                                                    1
                                                                )}
                                                        </span>
                                                    ))}
                                                {project.categories.length >
                                                    3 && (
                                                    <span className="px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm text-xs font-medium text-zinc-300">
                                                        +
                                                        {project.categories
                                                            .length - 3}{" "}
                                                        more
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <i className="fas fa-download text-primary" />
                                                    </div>
                                                    <span className="text-zinc-300">
                                                        {formatDownloads(
                                                            project.downloads
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <i className="fas fa-code-branch text-primary" />
                                                    </div>
                                                    <span className="text-zinc-300">
                                                        {project.versions
                                                            ?.length || 0}{" "}
                                                        versions
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
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
