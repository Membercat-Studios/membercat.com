import Navbar from "@/Components/Navbar/Navbar";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-zinc-950 scrollbar">
            <Navbar />
            <main className="pt-24">{children}</main>
        </div>
    );
}
