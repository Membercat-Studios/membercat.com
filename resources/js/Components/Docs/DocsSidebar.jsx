import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DocsSidebar({
    sections,
    currentSection,
    currentPage,
    className = "",
}) {
    const [expandedSections, setExpandedSections] = useState({});

    useEffect(() => {
        if (currentSection) {
            setExpandedSections((prev) => ({
                ...prev,
                [currentSection]: true,
            }));
        }
    }, [currentSection]);

    const toggleSection = (sectionDir) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionDir]: !prev[sectionDir],
        }));
    };

    return (
        <nav className={`w-full max-w-xs ${className}`}>
            <div className="space-y-1">
                {sections.map((section) => (
                    <div key={section.directory} className="mb-2">
                        {section.type === "single" ? (
                            // Render single file as a direct link
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={route("docs.show", {
                                        section: section.directory,
                                    })}
                                    className={`
                                        relative flex items-center w-full px-4 py-2 rounded-lg
                                        transition-all duration-200 group
                                        ${
                                            currentSection === section.directory
                                                ? "bg-primary/10 text-primary font-medium"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                        }
                                    `}
                                >
                                    {currentSection === section.directory && (
                                        <motion.div
                                            layoutId="active-section"
                                            className="absolute inset-0 rounded-lg border border-primary/20"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    <span className="relative text-sm">
                                        {section.name}
                                    </span>
                                </Link>
                            </motion.div>
                        ) : (
                            // Render category with expandable section
                            <div>
                                <button
                                    onClick={() =>
                                        toggleSection(section.directory)
                                    }
                                    className={`
                                        flex items-center justify-between w-full px-4 py-2 rounded-lg
                                        transition-all duration-200 group
                                        ${
                                            expandedSections[section.directory]
                                                ? "bg-zinc-800/50 text-white"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                        }
                                    `}
                                >
                                    <span className="text-sm font-medium">
                                        {section.name}
                                    </span>
                                    <motion.i
                                        animate={{
                                            rotate: expandedSections[
                                                section.directory
                                            ]
                                                ? 180
                                                : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="fas fa-chevron-down text-xs opacity-50 group-hover:opacity-100"
                                    />
                                </button>

                                <AnimatePresence mode="wait">
                                    {expandedSections[section.directory] && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="mt-1 space-y-1">
                                                {section.pages.map((page) => (
                                                    <motion.div
                                                        key={page.name}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -4,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                    >
                                                        <Link
                                                            href={route(
                                                                "docs.show",
                                                                {
                                                                    section:
                                                                        section.directory,
                                                                    page: page.name,
                                                                }
                                                            )}
                                                            className={`
                                                                relative flex items-center w-full px-4 py-2
                                                                rounded-lg text-sm transition-all duration-200
                                                                ${
                                                                    currentSection ===
                                                                        section.directory &&
                                                                    currentPage ===
                                                                        page.name
                                                                        ? "text-primary font-medium bg-primary/5"
                                                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 ml-2"
                                                                }
                                                            `}
                                                        >
                                                            {currentSection ===
                                                                section.directory &&
                                                                currentPage ===
                                                                    page.name && (
                                                                    <motion.div
                                                                        layoutId="active-page"
                                                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 -ml-2 rounded-full bg-primary"
                                                                        transition={{
                                                                            duration: 0.2,
                                                                        }}
                                                                    />
                                                                )}
                                                            <span className="relative truncate">
                                                                {page.title}
                                                            </span>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
}
