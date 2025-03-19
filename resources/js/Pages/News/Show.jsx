import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";

import Button from "@/Components/Button";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar/Navbar";

export default function NewsShow({ newsItem, relatedNews = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            <Head title={newsItem.title} />
            <main className="min-h-screen bg-zinc-950">
                <Navbar />

                <section className="relative py-24 md:py-32">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                        >
                            <div className="lg:col-span-8 lg:col-start-3">
                                <div className="text-sm text-primary mb-2">
                                    {newsItem.category?.name || "Uncategorized"}{" "}
                                    • {formatDate(newsItem.published_at)}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                    {newsItem.title}
                                </h1>

                                {newsItem.image && (
                                    <div className="relative overflow-hidden rounded-xl aspect-video mb-8">
                                        <img
                                            src={newsItem.image}
                                            alt={newsItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {newsItem.excerpt && (
                                    <div className="text-xl text-zinc-300 mb-8 font-medium italic border-l-4 border-primary pl-4 py-2">
                                        {newsItem.excerpt}
                                    </div>
                                )}

                                <div
                                    className="prose prose-invert prose-lg max-w-none
                                        prose-headings:font-semibold
                                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                                        prose-p:text-zinc-300 prose-p:leading-relaxed
                                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                        prose-strong:text-white/90 prose-strong:font-medium
                                        prose-code:text-primary/90 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 
                                        prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-['']
                                        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5
                                        prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:p-0
                                        prose-ul:my-6 prose-ul:list-disc prose-ul:marker:text-primary/50
                                        prose-ol:my-6 prose-ol:list-decimal prose-ol:marker:text-primary/50
                                        prose-li:my-2
                                        prose-blockquote:border-l-2 prose-blockquote:border-primary/30 
                                        prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg 
                                        prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:pr-4
                                        prose-blockquote:not-italic prose-blockquote:text-zinc-300
                                        prose-hr:my-12 prose-hr:border-white/5"
                                    dangerouslySetInnerHTML={{
                                        __html: newsItem.content,
                                    }}
                                />

                                {newsItem.is_featured && (
                                    <div className="flex items-center my-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                        <div className="mr-3 text-primary">
                                            <i className="fas fa-star text-xl"></i>
                                        </div>
                                        <div className="text-zinc-300">
                                            This is a featured article selected
                                            by our editors for its importance or
                                            relevance.
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center border-t border-zinc-800 mt-12 pt-6">
                                    <Button
                                        appearance="text"
                                        onClick={() => router.visit("/")}
                                        className="text-zinc-400 hover:text-primary"
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i>{" "}
                                        Back to Home
                                    </Button>

                                    <div className="flex space-x-3">
                                        <Button
                                            appearance="gray"
                                            className="w-10 h-10 !p-0 flex items-center justify-center"
                                        >
                                            <i className="fab fa-twitter"></i>
                                        </Button>
                                        <Button
                                            appearance="gray"
                                            className="w-10 h-10 !p-0 flex items-center justify-center"
                                        >
                                            <i className="fab fa-facebook-f"></i>
                                        </Button>
                                        <Button
                                            appearance="gray"
                                            className="w-10 h-10 !p-0 flex items-center justify-center"
                                        >
                                            <i className="fas fa-link"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {relatedNews.length > 0 && (
                            <div className="mt-16 pt-16 border-t border-zinc-800">
                                <h2 className="text-2xl font-bold text-white mb-8">
                                    Related Articles
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {relatedNews.map((item, index) => (
                                        <motion.a
                                            key={item.id}
                                            href={`/news/${item.slug}`}
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
                                                {item.category?.name ||
                                                    "Uncategorized"}{" "}
                                                •{" "}
                                                {formatDate(item.published_at)}
                                            </div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                                                {item.title}
                                            </h3>
                                        </motion.a>
                                    ))}
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
