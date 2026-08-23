import React from 'react';
import { motion } from "motion/react";
import { FileText, ArrowUpRight } from 'lucide-react';
import siteConfig from '../../config/site';
import { useResume } from '../../context/ResumeContext';

// Dynamic timeline constraint: B.Tech 2025-2029 (active until 15 Aug 2029)
const graduationDeadline = new Date('2029-08-15T23:59:59');
const isCurrentlyPursuing = new Date() <= graduationDeadline;
const academicPeriod = isCurrentlyPursuing ? "2025 — Present" : "2025 — 2029";

export function Background() {
    const { openResume } = useResume();

    return (
        <section className="w-full my-20">
            <div className='lg:text-8xl text-6xl text-neutral-800 relative top-7 font-inter font-bold h-full z-60 pointer-events-none select-none uppercase'>
                JOURNEY
            </div>
            <div className='lg:text-4xl text-2xl font-extralight text-left text-white z-70'>
                <p style={{ marginLeft: "12px" }} className='z-70 relative'>EDUCATION & BACKGROUND</p>
            </div>
            <div style={{ marginLeft: "10px", marginTop: "6px", height: "1px" }} className='bg-neutral-200 rounded-lg w-12'></div>

            <div style={{ marginTop: "30px" }} className='flex lg:flex-row flex-col lg:gap-0 gap-8 items-start'>
                <div className="left flex flex-col gap-6 text-neutral-500 text-sm lg:w-1/3 text-left">
                    <p className="leading-relaxed font-inter">
                        A solid foundation in computer science fundamentals paired with collaborative client engineering and open-source campus initiatives.
                    </p>

                    <div className="mt-1">
                        <a
                            href={siteConfig.resumeUrl}
                            onClick={openResume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center justify-between p-4 rounded-xl border border-neutral-900 bg-neutral-950/80 hover:bg-neutral-900/60 hover:border-neutral-700 transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-amber-500/40 flex items-center justify-center transition-colors duration-300">
                                    <FileText className="w-4 h-4 text-amber-500" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-mono text-white group-hover:text-amber-400 font-medium transition-colors">
                                        Curriculum Vitae
                                    </p>
                                    <p className="text-[11px] font-mono text-neutral-500">
                                        Official Resume • PDF
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                    </div>
                </div>

                <div className="right lg:ml-10 w-full lg:w-2/3 flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4 }}
                        className="group"
                    >
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-xs text-amber-500 font-inter">01</p>
                                    <h2 className="lg:text-2xl text-lg sm:text-xl font-light font-space text-white group-hover:text-amber-400 transition-colors duration-300">
                                        B.Tech in Computer Science & Engineering
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                                        isCurrentlyPursuing
                                            ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                                            : 'text-neutral-400 bg-neutral-900 border border-neutral-800'
                                    }`}>
                                        {isCurrentlyPursuing && (
                                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        )}
                                        {academicPeriod}
                                    </span>
                                </div>
                            </div>
                            <div className="h-px bg-neutral-800 rounded-lg mt-2 w-full mb-3.5 group-hover:bg-neutral-700 transition-colors duration-300"></div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
                                <span className="text-neutral-300">Guru Gobind Singh Indraprastha University (GGSIPU)</span>
                                <span>•</span>
                                <span className="text-neutral-500">New Delhi, IN</span>
                            </div>

                            <p className="text-xs sm:text-sm text-neutral-500 font-inter leading-relaxed">
                                Undergraduate coursework covering Data Structures, Algorithms, Discrete Mathematics, and Computer Architecture with a focus on building high-performance software systems.
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {["Data Structures", "Algorithms", "Discrete Math", "Systems Architecture", "C/C++"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] font-mono text-neutral-400 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800/80"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="group"
                    >
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <p className="text-xs text-amber-500 font-inter">02</p>
                                    <h2 className="lg:text-2xl text-lg sm:text-xl font-light font-space text-white group-hover:text-amber-400 transition-colors duration-300">
                                        DevSource by ACM
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-neutral-400 bg-neutral-900 border border-neutral-800">
                                        Collaborative Developer
                                    </span>
                                </div>
                            </div>
                            <div className="h-px bg-neutral-800 rounded-lg mt-2 w-full mb-3.5 group-hover:bg-neutral-700 transition-colors duration-300"></div>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
                                <span className="text-neutral-300">ACM Student Chapter</span>
                                <span>•</span>
                                <span className="text-neutral-500">Client & Community Deployments</span>
                            </div>

                            <p className="text-xs sm:text-sm text-neutral-500 font-inter leading-relaxed">
                                Collaborated with team members to deliver client revamps and community platforms. Contributed to the website overhaul for <span className="text-neutral-300 font-medium">The Voice of Glacier Foundation (TVGF)</span> and co-engineered the <span className="text-neutral-300 font-medium">Doggos of IPU</span> animal welfare awareness platform.
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {["Next.js", "Tailwind CSS", "Client Revamps", "Team Git Workflow"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] font-mono text-neutral-400 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800/80"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Background;
