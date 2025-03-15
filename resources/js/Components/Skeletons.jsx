import React from "react";

export const CardSkeleton = ({ className = "" }) => (
    <div
        className={`bg-zinc-900 rounded-xl p-6 border border-zinc-800 ${className}`}
    >
        <div className="flex items-center">
            <div className="rounded-lg bg-zinc-800 p-3 animate-pulse">
                <div className="w-5 h-5" />
            </div>
            <div className="ml-4 flex-1">
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse mb-2" />
                <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse" />
            </div>
        </div>
    </div>
);

export const ProfileSkeleton = ({ className = "" }) => (
    <div
        className={`flex items-start space-x-4 p-4 rounded-lg bg-zinc-800/50 ${className}`}
    >
        <div className="relative">
            <div className="w-12 h-12 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
        <div className="flex-1">
            <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
        </div>
    </div>
);

export const TextSkeleton = ({
    width = "w-24",
    height = "h-4",
    className = "",
}) => (
    <div
        className={`${height} ${width} bg-zinc-800 rounded animate-pulse ${className}`}
    />
);

export const ImageSkeleton = ({
    width = "w-12",
    height = "h-12",
    rounded = "rounded-lg",
    className = "",
}) => (
    <div
        className={`${height} ${width} ${rounded} bg-zinc-800 animate-pulse ${className}`}
    />
);
