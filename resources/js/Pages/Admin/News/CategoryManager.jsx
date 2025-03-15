import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import axios from "axios";

import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Modal from "@/Components/Modal";

export default function CategoryManager({ categories = [], onClose, isOpen }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.news.categories.store"), {
            onSuccess: () => {
                reset();
                router.reload({ only: ["categories"] });
            },
            preserveScroll: true,
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        put(route("admin.news.categories.update", editingCategory.id), {
            onSuccess: () => {
                resetEdit();
                setEditingCategory(null);
                router.reload({ only: ["categories"] });
            },
            preserveScroll: true,
        });
    };

    const confirmDelete = (category) => {
        setCategoryToDelete(category);
        setDeleteConfirmOpen(true);
        setErrorMessage(null);
    };

    const handleDelete = () => {
        if (!categoryToDelete) return;

        setDeleteProcessing(true);
        axios
            .delete(route("admin.news.categories.destroy", categoryToDelete.id))
            .then((response) => {
                setDeleteConfirmOpen(false);
                setCategoryToDelete(null);
                router.reload({ only: ["categories"] });
            })
            .catch((error) => {
                const message =
                    error.response?.data?.message ||
                    "Failed to delete category. It may be in use.";
                setErrorMessage(message);
            })
            .finally(() => {
                setDeleteProcessing(false);
            });
    };

    const startEditing = (category) => {
        setEditingCategory(category);
        setEditData({ name: category.name });
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="xl">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        Manage News Categories
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Add New Category
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <Input
                                id="category-name"
                                type="text"
                                label="Category Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors.name}
                                required
                            />
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    appearance="primary"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? "Adding..." : "Add Category"}
                                </Button>
                            </div>
                        </form>

                        {editingCategory && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Edit Category: {editingCategory.name}
                                </h3>
                                <form onSubmit={handleEdit}>
                                    <Input
                                        id="edit-category-name"
                                        type="text"
                                        label="Category Name"
                                        value={editData.name}
                                        onChange={(e) =>
                                            setEditData("name", e.target.value)
                                        }
                                        error={editErrors.name}
                                        required
                                    />
                                    <div className="mt-4 flex space-x-3">
                                        <Button
                                            type="button"
                                            appearance="secondary"
                                            onClick={() =>
                                                setEditingCategory(null)
                                            }
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            appearance="primary"
                                            disabled={editProcessing}
                                            className="flex-1"
                                        >
                                            {editProcessing
                                                ? "Updating..."
                                                : "Update"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Existing Categories
                        </h3>
                        {categories.length === 0 ? (
                            <div className="text-zinc-400 p-4 bg-zinc-800/50 rounded-lg text-center">
                                No categories found. Create your first category!
                            </div>
                        ) : (
                            <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                                <ul className="divide-y divide-zinc-700">
                                    {categories.map((category) => (
                                        <li key={category.id} className="p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-white">
                                                        {category.name}
                                                    </span>
                                                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                                                        {category.news_count ||
                                                            0}{" "}
                                                        posts
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        className="w-8 h-8 !bg-yellow-500 !text-white"
                                                        onClick={() =>
                                                            startEditing(
                                                                category
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <Button
                                                        className="w-8 h-8 !bg-red-500 !text-white"
                                                        onClick={() =>
                                                            confirmDelete(
                                                                category
                                                            )
                                                        }
                                                        disabled={
                                                            category.news_count >
                                                            0
                                                        }
                                                        title={
                                                            category.news_count >
                                                            0
                                                                ? "Cannot delete category with posts"
                                                                : "Delete category"
                                                        }
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                maxWidth="md"
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Confirm Deletion
                    </h2>
                    <p className="text-zinc-400 mb-6">
                        Are you sure you want to delete the category "
                        {categoryToDelete?.name}"? This action cannot be undone.
                    </p>

                    {errorMessage && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                            {errorMessage}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <Button
                            appearance="secondary"
                            onClick={() => setDeleteConfirmOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            appearance="danger"
                            onClick={handleDelete}
                            disabled={deleteProcessing}
                        >
                            {deleteProcessing ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
}
