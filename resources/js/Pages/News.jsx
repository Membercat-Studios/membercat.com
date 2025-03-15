import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";

import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import { ImageSkeleton, TextSkeleton } from "@/Components/Skeletons";

export default function News({ news, featuredNews, categories }) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const filteredNews =
        selectedCategory === "all"
            ? news.data
            : news.data.filter(
                  (item) => item.category?.slug === selectedCategory
              );

    return (
        <>
            <Head title="News" />
            <main className="min-h-screen bg-zinc-950">
                <Navbar />

                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 to-black/90 z-0"></div>
                    <div className="absolute inset-0 bg-[url('/images/news-bg.jpg')] bg-cover bg-center opacity-20 z-[-1]"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl md:text-6xl font-bold text-white mb-6"
                            >
                                Latest{" "}
                                <span className="text-primary">News</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xl text-zinc-400 leading-relaxed"
                            >
                                Stay updated with the latest announcements,
                                updates, and events from Membercat Studios.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {featuredNews.length > 0 && (
                    <section className="py-16 bg-black">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-white mb-8">
                                Featured News
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {featuredNews.map((item, index) => (
                                    <motion.a
                                        key={item.id}
                                        href={route("news.show", item.slug)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group block"
                                    >
                                        <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                            <img
                                                src={
                                                    item.image ||
                                                    "/images/placeholder-news.jpg"
                                                }
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                                <div className="text-xs font-medium text-primary mb-2">
                                                    {item.category?.name ||
                                                        "Uncategorized"}{" "}
                                                    •{" "}
                                                    {formatDate(
                                                        item.published_at
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 line-clamp-2">
                                            {item.excerpt}
                                        </p>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-16 bg-zinc-950">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-white">
                                All News
                            </h2>

                            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                                <Button
                                    appearance={
                                        selectedCategory === "all"
                                            ? "primary"
                                            : "secondary"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedCategory("all")}
                                >
                                    All
                                </Button>
                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        appearance={
                                            selectedCategory === category.slug
                                                ? "primary"
                                                : "secondary"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setSelectedCategory(category.slug)
                                        }
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((item, index) => (
                                <motion.a
                                    key={item.id}
                                    href={route("news.show", item.slug)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group block"
                                >
                                    <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                                        <img
                                            src={
                                                item.image ||
                                                "/images/placeholder-news.jpg"
                                            }
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="text-xs font-medium text-primary mb-2">
                                        {item.category?.name || "Uncategorized"}{" "}
                                        • {formatDate(item.published_at)}
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-zinc-400 line-clamp-2">
                                        {item.excerpt}
                                    </p>
                                </motion.a>
                            ))}
                        </div>

                        {news.links && news.links.length > 3 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex space-x-2">
                                    {news.links.map((link, i) => {
                                        if (link.url === null) return null;

                                        return (
                                            <a
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-md ${
                                                    link.active
                                                        ? "bg-primary text-white"
                                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
