import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import CategoryManager from "./CategoryManager";

export default function NewsIndex({ news, categories = [], success }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState(null);
    const [categoryManagerOpen, setCategoryManagerOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [filteredNews, setFilteredNews] = useState(news?.data || []);
    const [successMessage, setSuccessMessage] = useState(success);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        let result = news?.data || [];

        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchLower) ||
                    (item.excerpt &&
                        item.excerpt.toLowerCase().includes(searchLower))
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter(
                (item) => item.category_id === parseInt(selectedCategory)
            );
        }

        setFilteredNews(result);
    }, [search, selectedCategory, news]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const confirmDelete = (newsItem) => {
        setNewsToDelete(newsItem);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!newsToDelete) return;
        router.delete(route("admin.news.destroy", newsToDelete.id));
        setDeleteModalOpen(false);
    };

    return (
        <AdminLayout title="News Management">
            <p className="mt-2 text-zinc-400">
                Create, edit, and manage news posts for your website.
            </p>

            {successMessage && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-check-circle mr-2"></i>
                        <span>{successMessage}</span>
                    </div>
                    <button
                        onClick={() => setSuccessMessage(null)}
                        className="text-green-500 hover:text-green-400"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Input
                        type="search"
                        placeholder="Search news..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-xs"
                        icon="fas fa-search"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="all">All Categories</option>
                        {Array.isArray(categories) &&
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex gap-3">
                    <Button
                        appearance="secondary"
                        onClick={() => setCategoryManagerOpen(true)}
                    >
                        <i className="fas fa-tags mr-2"></i>
                        Manage Categories
                    </Button>

                    <Link href={route("admin.news.create")}>
                        <Button appearance="primary">
                            <i className="fas fa-plus mr-2"></i>
                            Create News Post
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Published
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Featured
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {filteredNews.map((item) => (
                                <tr key={item.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            {item.image && (
                                                <div className="flex-shrink-0 h-10 w-10 mr-3">
                                                    <img
                                                        className="h-10 w-10 rounded-md object-cover"
                                                        src={item.image}
                                                        alt={item.title}
                                                    />
                                                </div>
                                            )}
                                            <div className="text-sm font-medium text-white">
                                                {item.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {item.category ? (
                                            <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-primary/10 text-primary">
                                                {item.category.name}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-zinc-500 italic">
                                                Uncategorized
                                            </span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center text-sm text-zinc-400">
                                            {item.author?.profile_photo_url && (
                                                <img
                                                    src={
                                                        item.author
                                                            .profile_photo_url
                                                    }
                                                    alt={item.author.name}
                                                    className="h-6 w-6 rounded-full mr-2"
                                                />
                                            )}
                                            {item.author?.name}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-zinc-400">
                                            {formatDate(item.published_at)}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                item.is_featured
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-zinc-700/50 text-zinc-400"
                                            }`}
                                        >
                                            {item.is_featured ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route(
                                                    "news.show",
                                                    item.slug
                                                )}
                                                target="_blank"
                                                title="View"
                                            >
                                                <Button className="w-8 h-8 !bg-blue-500 !text-white">
                                                    <i className="fas fa-eye"></i>
                                                </Button>
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.news.edit",
                                                    item.id
                                                )}
                                                title="Edit"
                                            >
                                                <Button className="w-8 h-8 !bg-yellow-500 !text-white">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </Link>
                                            <Button
                                                className="w-8 h-8 !bg-red-500 !text-white"
                                                onClick={() =>
                                                    confirmDelete(item)
                                                }
                                                title="Delete"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-8 text-zinc-400">
                        {search || selectedCategory !== "all"
                            ? "No news posts match your search criteria."
                            : "No news posts found. Create your first news post!"}
                    </div>
                )}
            </div>

            {news?.links && news.links.length > 3 && (
                <div className="mt-6 flex justify-center">
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

            <Modal
                show={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                maxWidth="md"
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Confirm Deletion
                    </h2>
                    <p className="text-zinc-400 mb-6">
                        Are you sure you want to delete the news post "
                        {newsToDelete?.title}"? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <Button
                            appearance="secondary"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button appearance="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            <CategoryManager
                categories={categories || []}
                isOpen={categoryManagerOpen}
                onClose={() => setCategoryManagerOpen(false)}
            />
        </AdminLayout>
    );
}
