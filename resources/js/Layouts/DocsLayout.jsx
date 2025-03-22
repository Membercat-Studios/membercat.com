import { useState, useEffect, useRef } from "react";

import DocsSidebar from "@/Components/Docs/DocsSidebar";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";

export default function DocsLayout({
    children,
    sectionData,
    currentPath = "",
    tableOfContents = [],
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeHeading, setActiveHeading] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -66%", threshold: 0 }
        );

        document.querySelectorAll("h2[id], h3[id]").forEach((heading) => {
            observer.observe(heading);
        });

        return () => observer.disconnect();
    }, [children]);

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <div className="pt-24">
                <div className="max-w-7xl mx-auto">
                    <div className="lg:flex lg:gap-8">
                        <div className="hidden lg:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-zinc-800/50">
                            <div className="py-8 px-6 overflow-y-auto h-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
                                <DocsSidebar
                                    sectionData={sectionData}
                                    currentPath={currentPath}
                                />
                            </div>
                        </div>

                        <div className="min-w-0 flex-auto px-4 py-8 lg:px-8 lg:py-12">
                            <div className="max-w-3xl mx-auto">{children}</div>
                        </div>

                        {tableOfContents.length > 0 && (
                            <div className="hidden xl:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-l border-zinc-800/50">
                                <div className="py-8 pl-8 overflow-y-auto h-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-zinc-400">
                                            On this page
                                        </h4>
                                        <nav className="space-y-1">
                                            {tableOfContents.map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className={`
                                                        block py-1 text-sm transition-colors
                                                        ${
                                                            item.level === 2
                                                                ? "pl-0"
                                                                : "pl-4"
                                                        }
                                                        ${
                                                            activeHeading ===
                                                            item.id
                                                                ? "text-primary font-medium"
                                                                : "text-zinc-500 hover:text-zinc-300"
                                                        }
                                                    `}
                                                >
                                                    {item.title}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg"
            >
                <i className={`fas fa-${isSidebarOpen ? "times" : "bars"}`} />
            </button>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 w-80 bg-zinc-950 border-r border-zinc-800/50">
                        <div className="p-6 overflow-y-auto h-full">
                            <DocsSidebar
                                sectionData={sectionData}
                                currentPath={currentPath}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
