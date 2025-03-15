import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import Footer from "@/Components/Footer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CardSkeleton, ProfileSkeleton } from "@/Components/Skeletons";

export default function About() {
    const [teamData, setTeamData] = useState(null);
    const [projectStats, setProjectStats] = useState({
        totalProjects: 0,
        totalDownloads: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamResponse, projectsResponse] = await Promise.all([
                    axios.get(route("modrinth.team")),
                    axios.get(route("modrinth.membercat-projects")),
                ]);

                setTeamData(teamResponse.data);

                if (projectsResponse.data.projects) {
                    const projects = projectsResponse.data.projects;
                    const totalDownloads = projects.reduce(
                        (sum, project) => sum + project.downloads,
                        0
                    );

                    setProjectStats({
                        totalProjects: projects.length,
                        totalDownloads,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const getRolePriority = (role) => {
        const priorities = {
            "Studio Owner": 1,
            "Studio Manager / Developer": 2,
            default: 3,
        };
        return priorities[role] || priorities.default;
    };

    const sortedMembers = teamData?.members?.sort((a, b) => {
        const priorityA = getRolePriority(a.role);
        const priorityB = getRolePriority(b.role);
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.user.username.localeCompare(b.user.username);
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <AuthenticatedLayout>
            <Head title="About Us" />

            <div className="min-h-screen bg-black">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black">
                        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_2px,transparent_2px),linear-gradient(90deg,white_2px,transparent_2px)] [background-size:40px_40px]" />
                    </div>

                    <div className="container mx-auto px-4 py-32 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl md:text-6xl font-bold text-white mb-6"
                            >
                                About{" "}
                                <span className="text-primary">
                                    Membercat Studios
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xl text-zinc-400 leading-relaxed"
                            >
                                We are a passionate team of developers creating
                                innovative Minecraft experiences and tools that
                                empower creators and enhance gameplay for the
                                community.
                            </motion.p>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
                </section>

                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <CardSkeleton />
                                    <CardSkeleton />
                                    <CardSkeleton />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-zinc-900 rounded-xl p-8 h-full flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                                <i className="fas fa-cube text-2xl text-primary"></i>
                                            </div>
                                            <h3 className="text-4xl font-bold text-white mb-2">
                                                {projectStats.totalProjects}
                                            </h3>
                                            <p className="text-zinc-400">
                                                Projects Created
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.1,
                                        }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-zinc-900 rounded-xl p-8 h-full flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                                <i className="fas fa-download text-2xl text-primary"></i>
                                            </div>
                                            <h3 className="text-4xl font-bold text-white mb-2">
                                                {formatNumber(
                                                    projectStats.totalDownloads
                                                )}
                                            </h3>
                                            <p className="text-zinc-400">
                                                Total Downloads
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2,
                                        }}
                                        className="relative group"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-zinc-900 rounded-xl p-8 h-full flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                                <i className="fas fa-users text-2xl text-primary"></i>
                                            </div>
                                            <h3 className="text-4xl font-bold text-white mb-2">
                                                {teamData?.members?.length || 0}
                                            </h3>
                                            <p className="text-zinc-400">
                                                Team Members
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-zinc-950/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                        Our Mission
                                    </h2>
                                    <p className="text-zinc-400 mb-6 leading-relaxed">
                                        At Membercat Studios, we're dedicated to
                                        pushing the boundaries of what's
                                        possible in Minecraft. Our team combines
                                        technical expertise with creative vision
                                        to develop tools and experiences that
                                        empower both players and developers.
                                    </p>
                                    <p className="text-zinc-400 leading-relaxed">
                                        We believe in open collaboration,
                                        quality code, and creating experiences
                                        that bring joy to the Minecraft
                                        community. Every project we undertake is
                                        crafted with attention to detail and a
                                        commitment to excellence.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-70"></div>
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60"></div>
                                        <i className="fas fa-cube text-8xl text-primary/30"></i>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-3xl md:text-4xl font-bold text-white mb-4"
                                >
                                    Meet Our Team
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-zinc-400 max-w-2xl mx-auto"
                                >
                                    The talented individuals behind Membercat
                                    Studios who bring creativity, technical
                                    expertise, and passion to every project.
                                </motion.p>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[...Array(6)].map((_, index) => (
                                        <ProfileSkeleton
                                            key={index}
                                            className="h-full"
                                        />
                                    ))}
                                </div>
                            ) : sortedMembers ? (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {sortedMembers.map((member) => (
                                        <motion.div
                                            key={member.user.id}
                                            variants={item}
                                            className={`relative group overflow-hidden rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-primary/30 transition-all duration-300`}
                                        >
                                            {member.role === "Studio Owner" && (
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50"></div>
                                            )}
                                            {member.role ===
                                                "Studio Manager / Developer" && (
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-400 to-zinc-600"></div>
                                            )}

                                            <div className="p-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-primary/30 transition-all duration-300">
                                                            <img
                                                                src={
                                                                    member.user
                                                                        .avatar_url
                                                                }
                                                                alt={
                                                                    member.user
                                                                        .username
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        {member.role ===
                                                            "Studio Owner" && (
                                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                                <i className="fas fa-crown text-xs text-black" />
                                                            </div>
                                                        )}
                                                        {member.role ===
                                                            "Studio Manager / Developer" && (
                                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-zinc-200 rounded-full flex items-center justify-center shadow-lg">
                                                                <i className="fas fa-shield text-xs text-black" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                            {
                                                                member.user
                                                                    .username
                                                            }
                                                        </h3>
                                                        <p
                                                            className={`
                                                            ${
                                                                member.role ===
                                                                "Studio Owner"
                                                                    ? "text-primary"
                                                                    : member.role ===
                                                                      "Studio Manager / Developer"
                                                                    ? "text-zinc-300"
                                                                    : "text-zinc-500"
                                                            }
                                                        `}
                                                        >
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-zinc-800/30">
                                                    <p className="text-sm text-zinc-400 line-clamp-2">
                                                        {member.user.bio
                                                            ? member.user.bio
                                                            : "No bio provided"}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-zinc-800">
                                    <div className="text-4xl text-zinc-700 mb-4">
                                        <i className="fas fa-users-slash"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        No Team Members Found
                                    </h3>
                                    <p className="text-zinc-400">
                                        We couldn't load the team information at
                                        this time.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-6"
                            >
                                Join Our Community
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-zinc-400 mb-8"
                            >
                                Connect with us on Discord, GitHub, and Modrinth
                                to stay updated on our latest projects,
                                contribute to our open-source initiatives, or
                                just hang out with like-minded developers.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-wrap justify-center gap-4"
                            >
                                <a
                                    href="https://dc.kasai.gg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-[#5865F2] rounded-lg text-white font-medium flex items-center gap-2 hover:bg-[#4752c4] transition-colors"
                                >
                                    <i className="fab fa-discord"></i>
                                    Join our Discord
                                </a>
                                <a
                                    href="https://github.com/membercat-studios"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-zinc-800 rounded-lg text-white font-medium flex items-center gap-2 hover:bg-zinc-700 transition-colors"
                                >
                                    <i className="fab fa-github"></i>
                                    GitHub
                                </a>
                                <a
                                    href="https://modrinth.com/organization/membercat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-[#00AF5C] rounded-lg text-white font-medium flex items-center gap-2 hover:bg-[#009a50] transition-colors"
                                >
                                    <Icon icon="simple-icons:modrinth" />
                                    Modrinth
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}
