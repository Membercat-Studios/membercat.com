import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProfileTabs from "@/Components/ProfileTabs";

export default function ProfileLayout({
    children,
    title,
    description,
    current,
    auth,
}) {
    return (
        <AuthenticatedLayout>
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative mb-8">
                        <div className="h-48 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 backdrop-blur"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                                <div className="relative group">
                                    <img
                                        src={auth.user.profile_photo_url}
                                        alt={auth.user.name}
                                        className="h-32 w-32 rounded-xl ring-4 ring-zinc-900 object-cover shadow-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <i className="fas fa-camera text-white text-xl"></i>
                                    </div>
                                </div>
                                <div className="flex-grow pb-4">
                                    <h1 className="text-3xl font-bold text-white">
                                        {auth.user.name}
                                    </h1>
                                    <p className="text-zinc-400 mt-1">
                                        {auth.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-start mb-8">
                        <ProfileTabs current={current} />
                    </div>

                    <div className="bg-zinc-900 rounded-xl shadow-xl">
                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {title}
                                </h2>
                                <p className="text-zinc-400 mt-1">
                                    {description}
                                </p>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
