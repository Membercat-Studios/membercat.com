import md5 from "md5";

export default function Avatar({ user, size = 40, className = "" }) {
    const getAvatarUrl = () => {
        const hash = md5(user.email.toLowerCase().trim());
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
    };

    return (
        <img
            src={getAvatarUrl()}
            alt={user?.name || "Avatar"}
            className={`h-${size / 4} w-${
                size / 4
            } rounded-full object-cover ${className}`}
        />
    );
}
