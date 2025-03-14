import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import axios from "axios";

export default function Search({ isOpen, setIsOpen }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch] = useDebounce(searchTerm, 150);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const fetchAllProjects = async () => {
            if (allProjects.length > 0) return;

            try {
                const response = await axios.get(
                    route("modrinth.membercat-projects")
                );
                if (response.data.projects) {
                    setAllProjects(response.data.projects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        if (isOpen) {
            fetchAllProjects();
        }
    }, [isOpen, allProjects.length]);

    useEffect(() => {
        if (!debouncedSearch) {
            setProjects([]);
            return;
        }

        setLoading(true);

        const timeoutId = setTimeout(() => {
            const searchTerms = debouncedSearch.toLowerCase().split(" ");

            const filtered = allProjects.filter((project) => {
                const projectText = `${project.name.toLowerCase()} ${project.summary.toLowerCase()} ${project.categories
                    .join(" ")
                    .toLowerCase()}`;
                return searchTerms.every((term) => projectText.includes(term));
            });

            setProjects(filtered);
            setLoading(false);
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [debouncedSearch, allProjects]);

    const formatDownloads = (downloads) => {
        if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
        if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
        return downloads.toString();
    };

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

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center h-screen bg-black/60 backdrop-blur-[2px] overflow-hidden"
        >
            <div
                className="absolute inset-0"
                onClick={() => setIsOpen(false)}
            />
            <div className="w-full h-full overflow-y-auto pt-24 pb-8 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="w-full max-w-3xl mx-auto bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-6 shadow-xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-6 py-4 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                            {loading ? (
                                <div className="animate-spin">
                                    <i className="fas fa-circle-notch" />
                                </div>
                            ) : (
                                <i className="fas fa-search" />
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {searchTerm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2"
                            >
                                {projects.length === 0 && !loading ? (
                                    <div className="text-center py-8 text-zinc-400">
                                        No projects found
                                    </div>
                                ) : (
                                    projects.map((project) => (
                                        <motion.a
                                            key={project.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.15 }}
                                            href={`https://modrinth.com/project/${project.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-primary/50 transition-all duration-300 group w-full"
                                        >
                                            <div className="flex-shrink-0">
                                                {project.icon_url ? (
                                                    <img
                                                        src={project.icon_url}
                                                        alt={project.name}
                                                        className="w-16 h-16 rounded-lg border border-zinc-700 object-cover group-hover:shadow-md group-hover:shadow-primary/10 transition-all"
                                                        loading="lazy"
                                                        width="64"
                                                        height="64"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-lg bg-zinc-700 flex items-center justify-center">
                                                        <i className="fas fa-cube text-2xl text-zinc-400" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors truncate">
                                                        {project.name}
                                                    </h3>
                                                    <span className="px-2 py-0.5 bg-zinc-700/80 rounded-md text-xs text-zinc-300 whitespace-nowrap">
                                                        {formatProjectType(
                                                            project
                                                                .project_types?.[0] ||
                                                                "unknown"
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-zinc-400 line-clamp-2 mb-2">
                                                    {project.summary}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm text-zinc-400">
                                                    <div className="flex items-center gap-1">
                                                        <i className="fas fa-download text-primary/70" />
                                                        <span>
                                                            {formatDownloads(
                                                                project.downloads
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <i className="fas fa-code-branch text-primary/70" />
                                                        <span>
                                                            {project.versions
                                                                ?.length || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.a>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
