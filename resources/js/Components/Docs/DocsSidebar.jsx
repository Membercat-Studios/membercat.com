import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Page({
    section,
    currentSectionPath
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                href={route("docs.show", {
                    path: section.path,
                })}
                className={`
                    relative flex items-center w-full px-4 py-2 rounded-lg
                    transition-all duration-200 group
                    ${currentSectionPath === section.path
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }
                `}
            >
                {currentSectionPath === section.path && (
                    <motion.div
                        layoutId="active-section"
                        className="absolute inset-0 rounded-lg border border-primary/20"
                        transition={{ duration: 0.2 }}
                    />
                )}
                <span className="relative text-sm">
                    {section.title}
                </span>
            </Link>
        </motion.div>
    );
}

function Section({
    section,
    sectionData,
    currentSectionPath,
    toggleSection,
    expandedSections
}) {
    return (
        <div key={section.path} className="mb-2">
            {section.type === "single" ? (
                // Render single file as a direct link
                <Page section={section} currentSectionPath={currentSectionPath} />
            ) : (
                // Render category with expandable section
                <div>
                    <button
                        onClick={() =>
                            toggleSection(section.path)
                        }
                        className={`
                        flex items-center justify-between w-full px-4 py-2 rounded-lg
                        transition-all duration-200 group
                        ${expandedSections[section.path]
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
                                    section.path
                                ]
                                    ? 180
                                    : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="fas fa-chevron-down text-xs opacity-50 group-hover:opacity-100"
                        />
                    </button>

                    <AnimatePresence mode="wait">
                        {expandedSections[section.path] && (
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
                                    {section.subSections.sort(sortSections(sectionData)).map(path => <Section key={path} section={sectionData.sections[path]} sectionData={sectionData} currentSectionPath={currentSectionPath} toggleSection={toggleSection} expandedSections={expandedSections} />)}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

export function sortSections(sectionData) {
    return function (path1, path2) {
        let s1 = sectionData.sections[path1];
        let s2 = sectionData.sections[path2];
        return s1.position - s2.position;
    };
}

function getPageParent(sectionData, path) {
    let matching = Object.values(sectionData.sections)
        .filter(section => section.type === "category" && section.subSections.includes(path));
    return matching.length > 0 ? matching[0].path : "";
}

export default function DocsSidebar({
    sectionData,
    currentPath = "",
    className = "",
}) {
    const [expandedSections, setExpandedSections] = useState({});
    let currentSection = getPageParent(sectionData, currentPath);

    useEffect(() => {
        if (currentSection) {
            setExpandedSections((prev) => ({
                ...prev,
                [currentSection]: true,
            }));
        }
    }, [currentSection]);

    const toggleSection = (path) => {
        setExpandedSections((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    return (
        <nav className={`w-full max-w-xs ${className}`}>
            <div className="space-y-1">
                {sectionData.this.subSections.sort(sortSections(sectionData)).map(path => <Section key={path} section={sectionData.sections[path]} sectionData={sectionData} currentSectionPath={currentPath} toggleSection={toggleSection} expandedSections={expandedSections} />)}
            </div >
        </nav >
    );
}
