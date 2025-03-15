import { Head, useForm, router } from "@inertiajs/react";
import { useState, useRef } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import RichTextEditor from "@/Components/RichTextEditor";

export default function CreateNews({ categories = [] }) {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        excerpt: "",
        image: null,
        category_id: "",
        is_featured: false,
        published_at: new Date().toISOString().split("T")[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.news.store"), {
            onSuccess: () => reset(),
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setData("image", file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setData("image", null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <AdminLayout title="Create News Post">
            <p className="mt-2 text-zinc-400">
                Create a new news post for your website.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <Input
                                id="title"
                                type="text"
                                label="Title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                error={errors.title}
                                required
                                placeholder="Enter a compelling title..."
                            />

                            <Input
                                id="excerpt"
                                type="textarea"
                                label="Excerpt"
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData("excerpt", e.target.value)
                                }
                                error={errors.excerpt}
                                helperText="A short summary of the news post (optional)."
                                rows={3}
                                placeholder="Write a brief summary..."
                            />

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="content"
                                        className="block text-sm font-medium text-white"
                                    >
                                        Content
                                    </label>
                                    {errors.content && (
                                        <span className="text-xs text-red-500">
                                            {errors.content}
                                        </span>
                                    )}
                                </div>
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(content) =>
                                        setData("content", content)
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
                                <h3 className="text-lg font-medium text-white mb-4">
                                    Publishing Options
                                </h3>

                                <Input
                                    id="category"
                                    type="select"
                                    label="Category"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    error={errors.category_id}
                                    options={[
                                        {
                                            value: "",
                                            label: "Select a category",
                                        },
                                        ...categories.map((category) => ({
                                            value: category.id,
                                            label: category.name,
                                        })),
                                    ]}
                                />

                                <Input
                                    id="published_at"
                                    type="date"
                                    label="Publish Date"
                                    value={data.published_at}
                                    onChange={(e) =>
                                        setData("published_at", e.target.value)
                                    }
                                    error={errors.published_at}
                                    className="mt-4"
                                />

                                <Input
                                    id="is_featured"
                                    type="checkbox"
                                    label="Feature this post"
                                    checked={data.is_featured}
                                    onChange={(e) =>
                                        setData("is_featured", e.target.checked)
                                    }
                                    error={errors.is_featured}
                                    className="mt-4"
                                />
                            </div>

                            <div className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50">
                                <h3 className="text-lg font-medium text-white mb-4">
                                    Featured Image
                                </h3>

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-700 border-dashed rounded-md">
                                    {imagePreview ? (
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto h-40 object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                            <p className="text-xs text-center text-zinc-500">
                                                Click the X to remove the image
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 text-center">
                                            <i className="fas fa-image text-zinc-500 text-3xl"></i>
                                            <div className="flex text-sm text-zinc-500">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                                                >
                                                    <span>Upload an image</span>
                                                    <input
                                                        id="file-upload"
                                                        ref={fileInputRef}
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs text-zinc-500">
                                                PNG, JPG, GIF up to 2MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button
                        type="button"
                        appearance="danger"
                        onClick={() => router.visit(route("admin.news.index"))}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        appearance="success"
                        disabled={processing}
                    >
                        {processing ? "Creating..." : "Create News Post"}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
