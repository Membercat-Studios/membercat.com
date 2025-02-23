import { useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
        status: user.status || "online",
        avatar_type: user.use_gravatar
            ? "gravatar"
            : user.use_discord_avatar
            ? "discord"
            : user.use_github_avatar
            ? "github"
            : "",
    });

    const avatarOptions = [
        {
            type: "gravatar",
            label: "Gravatar",
            icon: "fas fa-globe",
            description: "Use your Gravatar image",
        },
    ];

    const selectNewPhoto = () => {
        photoInput.current?.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current?.files[0];
        if (!photo) return;

        setData((data) => ({
            ...data,
            photo,
            avatar_type: "upload",
        }));

        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(photo);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update.all"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setPhotoPreview(null);
                photoInput.current.value = "";
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group">
                            <img
                                src={photoPreview || user.profile_photo_url}
                                alt={user.name}
                                className="h-48 w-48 rounded-2xl object-cover ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/50"
                            />
                            <button
                                type="button"
                                onClick={selectNewPhoto}
                                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            >
                                <i className="fas fa-camera text-3xl text-white" />
                            </button>
                        </div>
                        <Button
                            type="button"
                            appearance="secondary"
                            onClick={selectNewPhoto}
                            size="sm"
                            icon="fas fa-upload"
                        >
                            Change Photo
                        </Button>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {avatarOptions.map((option) => (
                            <label
                                key={option.type}
                                className={`
                                    relative flex cursor-pointer rounded-lg border p-4 
                                    focus:outline-none ${
                                        data.avatar_type === option.type
                                            ? "border-primary bg-primary/10"
                                            : "border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="avatar_type"
                                    value={option.type}
                                    className="sr-only"
                                    checked={data.avatar_type === option.type}
                                    onChange={(e) =>
                                        setData("avatar_type", e.target.value)
                                    }
                                />
                                <div className="flex w-full items-center gap-4">
                                    <div
                                        className={`
                                            flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                                            ${
                                                data.avatar_type === option.type
                                                    ? "bg-primary text-white"
                                                    : "bg-zinc-700 text-zinc-400"
                                            }
                                        `}
                                    >
                                        <i
                                            className={`${option.icon} text-lg`}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className={`
                                                font-medium
                                                ${
                                                    data.avatar_type ===
                                                    option.type
                                                        ? "text-primary"
                                                        : "text-white"
                                                }
                                            `}
                                        >
                                            {option.label}
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <Input
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                            required
                        />

                        <Input
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                            required
                            autoComplete="username"
                        />

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="text-sm text-zinc-400">
                                Your email address is unverified.
                                <button
                                    type="button"
                                    className="ml-2 text-primary hover:text-primary/80 underline"
                                    onClick={() =>
                                        post(route("verification.send"))
                                    }
                                >
                                    Click here to re-send the verification
                                    email.
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">
                <Button
                    appearance="success"
                    type="submit"
                    disabled={processing}
                    loading={processing}
                >
                    Save Changes
                </Button>

                {status && (
                    <p className="text-sm text-green-500">
                        Profile updated successfully.
                    </p>
                )}
            </div>

            <input
                type="file"
                className="hidden"
                ref={photoInput}
                onChange={updatePhotoPreview}
                accept="image/*"
            />
        </form>
    );
}
