import { Head } from "@inertiajs/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Search from "@/Components/Search";
import { ImageSkeleton, TextSkeleton } from "@/Components/Skeletons";

export default function Projects({ auth }) {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [metadata, setMetadata] = useState({
        categories: [],
        project_types: [],
        total: 0,
    });
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filters, setFilters] = useState({
        project_type: "all",
        category: "all",
        sort: "downloads",
    });
    const [showFilters, setShowFilters] = useState(false);
    const filtersRef = useRef(null);

    const sortOptions = [
        { id: "downloads", label: "Most Downloads", icon: "fa-download" },
        { id: "updated", label: "Recently Updated", icon: "fa-calendar-alt" },
        { id: "newest", label: "Newest First", icon: "fa-star" },
        { id: "name", label: "Alphabetical", icon: "fa-sort-alpha-down" },
    ];

    const formatProjectType = (type) => {
        if (!type) return "Unknown";

        const typeMap = {
            mod: "Mod",
            modpack: "Modpack",
            plugin: "Plugin",
            datapack: "Data Pack",
            resourcepack: "Resource Pack",
            shader: "Shader",
        };

        return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
    };

    const formatCategory = (category) => {
        return (
            category.charAt(0).toUpperCase() +
            category.slice(1).replace(/-/g, " ")
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filtersRef.current &&
                !filtersRef.current.contains(event.target) &&
                !event.target.closest(".filter-toggle-btn")
            ) {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchProjects = async (skipCache = false) => {
        try {
            setLoading(true);
            const response = await axios.get(
                route("modrinth.membercat-projects"),
                {
                    params: {
                        ...filters,
                        skipCache,
                    },
                }
            );

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            setProjects(response.data.projects);
            setMetadata(response.data.metadata);
        } catch (error) {
            setError(error.message || "Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [filters]);

    const refresh = async () => {
        setRefreshing(true);
        setLoading(true);

        await fetchProjects(true);

        setRefreshing(false);
    };

    const formatDownloads = (downloads) => {
        if (downloads >= 1000000) {
            return `${(downloads / 1000000).toFixed(1)}M`;
        } else if (downloads >= 1000) {
            return `${(downloads / 1000).toFixed(1)}K`;
        }
        return downloads.toString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) {
            return `${diffDays} days ago`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months > 1 ? "s" : ""} ago`;
        } else {
            return date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
    };

    const resetFilters = () => {
        setFilters({
            project_type: "all",
            category: "all",
            sort: "downloads",
        });
    };

    const currentSortOption = sortOptions.find(
        (option) => option.id === filters.sort
    );

    const ProjectCardSkeleton = () => (
        <div className="flex flex-col h-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
            <div className="relative">
                <div className="h-32 bg-zinc-800 animate-pulse"></div>
                <div className="absolute -bottom-8 left-6">
                    <div className="p-1 bg-zinc-900 rounded-xl shadow-lg">
                        <ImageSkeleton
                            width="w-16"
                            height="h-16"
                            rounded="rounded-lg"
                        />
                    </div>
                </div>
                <div className="absolute top-4 right-4">
                    <TextSkeleton
                        width="w-20"
                        height="h-6"
                        className="rounded-full"
                    />
                </div>
            </div>

            <div className="flex-1 p-6 pt-10">
                <TextSkeleton width="w-3/4" height="h-7" className="mb-3" />
                <TextSkeleton width="w-full" height="h-4" className="mb-2" />
                <TextSkeleton width="w-full" height="h-4" className="mb-2" />
                <TextSkeleton width="w-2/3" height="h-4" className="mb-4" />

                <div className="flex flex-wrap gap-2 mb-4">
                    <TextSkeleton
                        width="w-16"
                        height="h-6"
                        className="rounded-md"
                    />
                    <TextSkeleton
                        width="w-20"
                        height="h-6"
                        className="rounded-md"
                    />
                    <TextSkeleton
                        width="w-24"
                        height="h-6"
                        className="rounded-md"
                    />
                </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-800/80 bg-black/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <TextSkeleton width="w-16" height="h-5" />
                        <TextSkeleton width="w-12" height="h-5" />
                    </div>
                    <TextSkeleton width="w-24" height="h-4" />
                </div>
            </div>
        </div>
    );

    const handleProjectClick = async (project) => {
        try {
            await axios.post(route("log.activity"), {
                type: "project_click",
                action: "clicked on project",
                target: project.name,
                target_id: project.id,
            });
        } catch (error) {}

        window.open(`https://modrinth.com/project/${project.slug}`, "_blank");
    };

    return (
        <>
            <Head title="Projects" />

            <main className="flex flex-col min-h-screen bg-black">
                <Navbar />

                <section className="relative py-16 pt-32 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] [background-size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-70" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                                Our{" "}
                                <span className="text-primary">Projects</span>
                            </h1>
                            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                                Explore our collection of Minecraft mods,
                                plugins, and resource packs created by the
                                Membercat Studios team and community.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    appearance="primary"
                                    size="lg"
                                    icon="fas fa-search"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    Search Projects
                                </Button>
                                <Button
                                    appearance="secondary"
                                    size="lg"
                                    icon="fas fa-filter"
                                    className="filter-toggle-btn"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    Filter Projects
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

                <section className="py-12 bg-black">
                    <div className="container mx-auto px-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {filters.project_type !== "all" && (
                                        <div className="px-3 py-1.5 bg-zinc-800/80 rounded-full text-sm text-white flex items-center gap-2">
                                            <span>
                                                Type:{" "}
                                                {formatProjectType(
                                                    filters.project_type
                                                )}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setFilters({
                                                        ...filters,
                                                        project_type: "all",
                                                    })
                                                }
                                                className="text-zinc-400 hover:text-white transition-colors"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    )}

                                    {filters.category !== "all" && (
                                        <div className="px-3 py-1.5 bg-zinc-800/80 rounded-full text-sm text-white flex items-center gap-2">
                                            <span>
                                                Category:{" "}
                                                {formatCategory(
                                                    filters.category
                                                )}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setFilters({
                                                        ...filters,
                                                        category: "all",
                                                    })
                                                }
                                                className="text-zinc-400 hover:text-white transition-colors"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    )}

                                    {(filters.project_type !== "all" ||
                                        filters.category !== "all") && (
                                        <button
                                            onClick={resetFilters}
                                            className="text-primary hover:text-primary/80 text-sm transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-full text-sm text-white hover:bg-zinc-700/80 transition-colors relative"
                                        onClick={refresh}
                                        disabled={refreshing}
                                    >
                                        <i
                                            className={`fas fa-sync ${
                                                refreshing ? "animate-spin" : ""
                                            }`}
                                        ></i>
                                        {refreshing && (
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                                        )}
                                    </button>
                                    <span className="text-zinc-400 text-sm">
                                        Sort by:
                                    </span>
                                    <div className="relative">
                                        <button
                                            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 rounded-full text-sm text-white hover:bg-zinc-700/80 transition-colors"
                                            onClick={() => {
                                                const currentIndex =
                                                    sortOptions.findIndex(
                                                        (option) =>
                                                            option.id ===
                                                            filters.sort
                                                    );
                                                const nextIndex =
                                                    (currentIndex + 1) %
                                                    sortOptions.length;
                                                setFilters({
                                                    ...filters,
                                                    sort: sortOptions[nextIndex]
                                                        .id,
                                                });
                                            }}
                                        >
                                            <i
                                                className={`fas ${currentSortOption.icon} text-primary`}
                                            ></i>
                                            <span>
                                                {currentSortOption.label}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        ref={filtersRef}
                                        initial={{ x: -300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            damping: 25,
                                            stiffness: 300,
                                        }}
                                        className="fixed left-0 top-0 h-full w-80 bg-zinc-900 border-r border-zinc-800 z-50 overflow-y-auto"
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-xl font-bold text-white">
                                                    Filters
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        setShowFilters(false)
                                                    }
                                                    className="text-zinc-400 hover:text-white transition-colors"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>

                                            <div className="mb-8">
                                                <h4 className="text-white font-medium mb-3">
                                                    Project Type
                                                </h4>
                                                <div className="space-y-2">
                                                    <div
                                                        className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                                            filters.project_type ===
                                                            "all"
                                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                                : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border border-transparent"
                                                        }`}
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                project_type:
                                                                    "all",
                                                            })
                                                        }
                                                    >
                                                        All Types
                                                    </div>

                                                    {metadata.project_types.map(
                                                        (type) => (
                                                            <div
                                                                key={type}
                                                                className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                                                    filters.project_type ===
                                                                    type
                                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                                        : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border border-transparent"
                                                                }`}
                                                                onClick={() =>
                                                                    setFilters({
                                                                        ...filters,
                                                                        project_type:
                                                                            type,
                                                                    })
                                                                }
                                                            >
                                                                {formatProjectType(
                                                                    type
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-8">
                                                <h4 className="text-white font-medium mb-3">
                                                    Categories
                                                </h4>
                                                <div className="space-y-2">
                                                    <div
                                                        className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                                            filters.category ===
                                                            "all"
                                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                                : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border border-transparent"
                                                        }`}
                                                        onClick={() =>
                                                            setFilters({
                                                                ...filters,
                                                                category: "all",
                                                            })
                                                        }
                                                    >
                                                        All Categories
                                                    </div>

                                                    {metadata.categories.map(
                                                        (category) => (
                                                            <div
                                                                key={category}
                                                                className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                                                    filters.category ===
                                                                    category
                                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                                        : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 border border-transparent"
                                                                }`}
                                                                onClick={() =>
                                                                    setFilters({
                                                                        ...filters,
                                                                        category:
                                                                            category,
                                                                    })
                                                                }
                                                            >
                                                                {formatCategory(
                                                                    category
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <Button
                                                appearance="primary"
                                                size="md"
                                                className="w-full"
                                                onClick={() =>
                                                    setShowFilters(false)
                                                }
                                            >
                                                Apply Filters
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, index) => (
                                        <ProjectCardSkeleton key={index} />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-center py-24 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                    <div className="text-4xl text-zinc-700 mb-4">
                                        <i className="fas fa-exclamation-circle"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Something went wrong
                                    </h3>
                                    <p className="text-zinc-400 mb-6">
                                        {error}
                                    </p>
                                    <Button
                                        appearance="secondary"
                                        size="md"
                                        onClick={() => window.location.reload()}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-24 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                    <div className="text-4xl text-zinc-700 mb-4">
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        No projects found
                                    </h3>
                                    <p className="text-zinc-400 mb-6">
                                        Try adjusting your filters or search
                                        criteria
                                    </p>
                                    <Button
                                        appearance="secondary"
                                        size="md"
                                        onClick={resetFilters}
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-zinc-500 mb-6">
                                        Showing {projects.length} project
                                        {projects.length !== 1 ? "s" : ""}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {projects.map((project) => (
                                            <motion.a
                                                key={project.id}
                                                href={`https://modrinth.com/project/${project.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex flex-col h-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-primary/30 transition-all duration-300"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                whileHover={{ y: -5 }}
                                                transition={{ duration: 0.3 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleProjectClick(project);
                                                }}
                                            >
                                                <div className="relative">
                                                    {project.banner_url ? (
                                                        <div className="h-32 overflow-hidden">
                                                            <img
                                                                src={
                                                                    project.banner_url
                                                                }
                                                                loading="eager"
                                                                alt={`${project.name} banner`}
                                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                                        </div>
                                                    ) : (
                                                        <div className="h-32 bg-gradient-to-r from-primary/20 to-zinc-900"></div>
                                                    )}

                                                    <div className="absolute -bottom-8 left-6">
                                                        <div className="p-1 bg-zinc-900 rounded-xl shadow-lg">
                                                            {project.icon_url ? (
                                                                <img
                                                                    src={
                                                                        project.icon_url
                                                                    }
                                                                    alt={
                                                                        project.name
                                                                    }
                                                                    className="w-16 h-16 rounded-lg object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center">
                                                                    <i className="fas fa-cube text-2xl text-zinc-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-4 right-4">
                                                        <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-zinc-700/30">
                                                            {formatProjectType(
                                                                project
                                                                    .project_types[0] ||
                                                                    "unknown"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-1 p-6 pt-10">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                                                        {project.name}
                                                    </h3>

                                                    <p className="text-zinc-400 text-sm line-clamp-3 mb-4">
                                                        {project.summary}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.categories
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    category,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="px-2 py-1 bg-zinc-800/70 rounded-md text-xs text-zinc-300"
                                                                    >
                                                                        {formatCategory(
                                                                            category
                                                                        )}
                                                                    </span>
                                                                )
                                                            )}
                                                        {project.categories
                                                            .length > 3 && (
                                                            <span className="px-2 py-1 bg-zinc-800/70 rounded-md text-xs text-zinc-300">
                                                                +
                                                                {project
                                                                    .categories
                                                                    .length -
                                                                    3}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="px-6 py-4 border-t border-zinc-800/80 bg-black/20">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1.5 text-sm">
                                                                <i className="fas fa-download text-primary/70"></i>
                                                                <span className="text-zinc-300">
                                                                    {formatDownloads(
                                                                        project.downloads
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-1.5 text-sm">
                                                                <i className="fas fa-code-branch text-primary/70"></i>
                                                                <span className="text-zinc-300">
                                                                    {project
                                                                        .versions
                                                                        ?.length ||
                                                                        0}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="text-xs text-zinc-500">
                                                            Updated{" "}
                                                            {formatDate(
                                                                project.updated
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
