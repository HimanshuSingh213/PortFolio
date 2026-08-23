import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';

const renderDescription = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, index) => 
        index % 2 === 1 
            ? <em key={index} className="font-serif italic font-medium text-neutral-200">{part}</em> 
            : part
    );
};

const timeAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays <= 30) return `${diffDays}d ago`;

    return null;
};

const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "ai", label: "AI & LLMs" },
    { id: "academic", label: "Academic" },
    { id: "tools", label: "Tools & APIs" },
    { id: "client-team", label: "Client & Team" },
];

export function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [githubData, setGithubData] = useState({});

    const filteredProjects = projects.filter(project => {
        if (activeCategory === "all") return true;
        return project.tags?.includes(activeCategory);
    });

    const projectsPerPage = 2;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const selectedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/HimanshuSingh213/repos?per_page=100");
                if (response.ok) {
                    const repos = await response.json();
                    const dataMap = {};
                    repos.forEach(repo => {
                        const info = {
                            pushed_at: repo.pushed_at,
                            language: repo.language
                        };
                        dataMap[repo.name] = info;
                        dataMap[repo.name.toLowerCase()] = info;
                    });
                    setGithubData(dataMap);
                }
            } catch (error) {
                console.error("Failed to fetch Github data", error);
            }
        };

        fetchGithubRepos();
    }, []);

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        setCurrentPage(1);
    };

    return (
        <div>
            <div id='work' className='lg:text-8xl text-6xl text-neutral-800 relative top-7 font-inter font-bold h-full z-60 pointer-events-none select-none'>
                WORK
            </div>
            <div className='lg:text-4xl text-2xl font-extralight text-left text-white z-70'>
                <p style={{ marginLeft: "12px" }} className='z-70 relative'>Projects</p>
            </div>
            <div style={{ marginLeft: "10px", marginTop: "6px", height: "1px" }} className='bg-neutral-200 rounded-lg w-12'></div>
            
            <div className="flex flex-wrap items-center gap-2 mt-10 mb-2">
                {CATEGORIES.map((cat) => {
                    const count = cat.id === "all" 
                        ? projects.length 
                        : projects.filter(p => p.tags?.includes(cat.id)).length;
                    
                    if (count === 0) return null;

                    const isActive = activeCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer border ${
                                isActive
                                    ? "bg-neutral-900 border-amber-500/50 text-amber-400 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.1)]"
                                    : "bg-neutral-950/40 border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800"
                            }`}
                        >
                            <span>{cat.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isActive ? "bg-amber-500/20 text-amber-300" : "bg-neutral-900 text-neutral-600"
                            }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className='flex flex-col gap-24 mt-12'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${currentPage}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col gap-24"
                    >
                        {selectedProjects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1] }}
                                    className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 w-full group`}
                                >
                                    <div className="relative w-full lg:w-1/2 min-h-55 sm:min-h-70 md:min-h-85 rounded-3xl border border-neutral-900 bg-neutral-950/40 hover:bg-neutral-950/60 overflow-hidden flex items-center justify-center p-6 md:p-12 transition-all duration-500 shadow-2xl shadow-black/50 hover:border-neutral-800 group/img">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        <div className="absolute inset-0 opacity-[0.02] group-hover/img:opacity-[0.04] transition-opacity duration-500 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[16px_16px]" />
                                        
                                        <div className="absolute top-4 right-6 font-mono text-4xl md:text-5xl font-extrabold text-neutral-800/40 select-none group-hover/img:text-amber-500/20 transition-all duration-500">
                                            {project.id}
                                        </div>
                                        
                                        <motion.img
                                            whileHover={{ scale: 1.05, rotate: isEven ? 1 : -1 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="max-h-40 sm:max-h-50 md:max-h-60 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover/img:drop-shadow-[0_20px_40px_rgba(245,158,11,0.15)] transition-all duration-300 select-none"
                                            src={project.image}
                                            alt={`${project.title} logo`}
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
                                            }}
                                        />
                                    </div>

                                    <div className="w-full lg:w-1/2 flex flex-col space-y-5 justify-center py-4">
                                        <div className="space-y-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-space italic font-light text-neutral-500 text-xs tracking-widest uppercase block">
                                                        {project.category}
                                                    </span>
                                                    {project.status === "wip" && (
                                                        <span className="text-[9px] font-mono tracking-widest text-amber-500 border border-amber-500/30 bg-amber-500/5 px-1.5 py-0.5 rounded-md uppercase font-bold select-none leading-none">
                                                            WIP
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {(() => {
                                                    const repoInfo = githubData[project.repoName] || (project.repoName && githubData[project.repoName.toLowerCase()]);
                                                    const recentActivity = repoInfo?.pushed_at ? timeAgo(repoInfo.pushed_at) : null;

                                                    if (recentActivity) {
                                                        return (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-geist text-neutral-400 bg-neutral-950/60 px-2.5 py-0.5 border border-neutral-900 rounded-full select-none">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                                <span>active {recentActivity}</span>
                                                            </div>
                                                        );
                                                    }

                                                    if (project.live) {
                                                        return (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-geist text-neutral-400 bg-neutral-950/60 px-2.5 py-0.5 border border-neutral-900 rounded-full select-none">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.3)]" />
                                                                <span>production</span>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div className="flex items-center gap-1.5 text-[10px] font-geist text-neutral-500 bg-neutral-950/60 px-2.5 py-0.5 border border-neutral-900 rounded-full select-none">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                                                            <span>open source</span>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            <h3 className="text-neutral-100 text-3xl md:text-5xl font-bold tracking-tight font-space group-hover:text-amber-500 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-neutral-400 text-base md:text-lg font-space leading-relaxed font-light">
                                            {renderDescription(project.description)}
                                        </p>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.tech.map((techItem) => (
                                                <span
                                                    key={techItem}
                                                    className="px-3 py-1.5 text-xs font-geist text-neutral-400 border border-neutral-900 bg-neutral-950/50 rounded-full hover:border-neutral-800 hover:text-neutral-200 transition-all duration-300 flex items-center gap-1.5"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                                                    {techItem}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 pt-2">
                                            <a
                                                href={project.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-900 bg-neutral-950/40 hover:bg-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-all duration-300 text-sm font-space font-semibold"
                                            >
                                                <Github className="w-4 h-4" />
                                                CODE
                                            </a>
                                            {project.status === "wip" ? (
                                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-neutral-900 text-neutral-500 font-space font-semibold text-sm select-none cursor-not-allowed">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                                                    BUILDING
                                                </div>
                                            ) : (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-space font-bold transition-all duration-300 text-sm shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5"
                                                >
                                                    <span>LIVE DEMO</span>
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center items-center gap-3 mt-8 font-space select-none">
                        <button 
                            onClick={() => {
                                setCurrentPage(p => Math.max(p - 1, 1));
                                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-neutral-900 hover:border-neutral-800 text-neutral-500 hover:text-white disabled:opacity-20 disabled:pointer-events-none rounded-xl transition-all duration-300 text-xs font-mono tracking-wider cursor-pointer"
                        >
                            PREV
                        </button>
                        
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => {
                                        setCurrentPage(pageNum);
                                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`w-9 h-9 rounded-xl border font-mono transition-all duration-500 text-xs cursor-pointer ${
                                        currentPage === pageNum 
                                            ? 'border-amber-500/50 bg-neutral-900 text-amber-500 font-bold shadow-[0_0_12px_rgba(245,158,11,0.1)]' 
                                             : 'border-neutral-900 text-neutral-500 hover:text-white hover:border-neutral-800 bg-neutral-950/20'
                                    }`}
                                >
                                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => {
                                setCurrentPage(p => Math.min(p + 1, totalPages));
                                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-neutral-900 hover:border-neutral-800 text-neutral-500 hover:text-white disabled:opacity-20 disabled:pointer-events-none rounded-xl transition-all duration-300 text-xs font-mono tracking-wider cursor-pointer"
                        >
                            NEXT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectsSection;
