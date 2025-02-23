import md5 from "md5";

export default function Gravatar({ user, size = 40, className = "" }) {
    const getAvatarUrl = () => {
        if (!user) {
            return `https://ui-avatars.com/api/?size=${size}&name=?&color=7F9CF5&background=EBF4FF`;
        }

        if (user.profile_photo_path) {
            return user.profile_photo_url;
        }

        if (user.discord_id && user.use_discord_avatar) {
            return `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.discord_avatar}.png?size=${size}`;
        }

        if (user.github_id && user.use_github_avatar) {
            return `https://avatars.githubusercontent.com/u/${user.github_id}?s=${size}`;
        }

        if (user.use_gravatar) {
            const hash = md5(user.email.toLowerCase().trim());
            return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
        }

        return `https://ui-avatars.com/api/?size=${size}&name=${encodeURIComponent(
            user.name
        )}&color=7F9CF5&background=EBF4FF`;
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
