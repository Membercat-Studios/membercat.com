import { Head } from "@inertiajs/react";
import DocsLayout from "@/Layouts/DocsLayout";
import { motion } from "framer-motion";
import { sortSections } from "@/Components/Docs/DocsSidebar";

export default function DocsHome({ sectionData }) {
    return (
        <DocsLayout sectionData={sectionData}>
            <Head title="Documentation" />

            <div className="space-y-16">
                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Documentation
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                        Welcome to the Membercat Studios documentation. Here
                        you'll find comprehensive guides and documentation to
                        help you start working with our projects.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {sectionData.this.subSections.sort(sortSections(sectionData)).map((path, i) => {
                        let section = sectionData.sections[path];
                        return (
                            <motion.div
                                key={path}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-primary/20 transition-colors">
                                    <h2 className="text-2xl font-semibold text-white mb-3">
                                        {section.title ?? section.name}
                                    </h2>
                                    <p className="text-zinc-400 mb-6 min-h-[3rem]">
                                        {section.description ||
                                            `${section.subSections.length} guides available`}
                                    </p>
                                    <a
                                        href={route("docs.show", {
                                            path: path
                                        })}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Get Started
                                        <i className="fas fa-arrow-right text-xs" />
                                    </a>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </DocsLayout>
    );
}
