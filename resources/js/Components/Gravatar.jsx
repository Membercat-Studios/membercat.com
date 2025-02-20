import md5 from "md5";

export default function Gravatar({ email, size = 40, className = "" }) {
    const hash = md5(email.toLowerCase().trim());
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;

    return (
        <img
            src={gravatarUrl}
            alt="User avatar"
            className={`rounded-full ${className}`}
            width={size}
            height={size}
        />
    );
}
