import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from 'lucide-react';

const items = [
    { id: "01", title: "EMAIL", tech: "himanshusingh213@zohomail.in", a: "mailto:himanshusingh213@zohomail.in", isEmail: true },
    { id: "02", title: "GITHUB", tech: "@HimanshuSingh213", a: "https://github.com/HimanshuSingh213" },
    { id: "03", title: "LINKEDIN", tech: "@himanshu-singh-dangi", a: "https://www.linkedin.com/in/himanshu-singh-dangi-631869372/" },
    { id: "04", title: "TWITTER", tech: "@HimanshuInTech", a: "https://x.com/HimanshuInTech" },
];

export function ContactSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleEmailClick = (e) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText("himanshusingh213@zohomail.in");
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <section className="w-full relative">
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/95 border border-neutral-700 text-white text-xs sm:text-sm font-geist shadow-2xl backdrop-blur-md"
                    >
                        <Check className="w-4 h-4 text-white" />
                        <span>Email <strong>himanshusingh213@zohomail.in</strong> copied to clipboard!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between my-4">
                <h3 className='text-xs text-amber-500 border border-amber-500/80 rounded-xl text-left w-fit px-2.5 py-1 font-space tracking-wide'>
                    Say Hello
                </h3>

                <button
                    onClick={handleEmailClick}
                    className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-3 py-1 rounded-lg cursor-pointer"
                    title="Copy Email"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span className="text-white">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Copy Email</span>
                        </>
                    )}
                </button>
            </div>

            <div className="flex flex-col w-full py-6 md:py-10">
                {items.map((item, i) => {
                    const isEmail = item.isEmail;

                    return (
                        <motion.a
                            key={item.id}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={(e) => {
                                if (isEmail) {
                                    handleEmailClick(e);
                                }
                            }}
                            animate={{
                                x: hoveredIndex === i ? 20 : hoveredIndex === null ? 0 : -20,
                                opacity: hoveredIndex === null ? 1 : hoveredIndex === i ? 1 : 0.25,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            target={isEmail ? undefined : '_blank'}
                            href={item.a}
                            rel="noopener noreferrer"
                            className="group border-b border-neutral-800 py-5 md:py-8 px-2 md:px-4 flex items-center justify-between cursor-pointer relative"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 font-space tracking-tight">
                                <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white md:text-neutral-400 md:group-hover:text-white uppercase tracking-tighter transition-colors duration-300">
                                    {item.title}
                                </h2>
                                <span className="text-xs font-mono text-neutral-400 md:hidden">
                                    {item.tech}
                                </span>
                            </div>

                            <div className="md:hidden text-neutral-400 flex items-center">
                                <span className="text-lg">↗</span>
                            </div>

                            <div className='group-hover:opacity-100 opacity-0 transition duration-200 ease-in-out lg:flex flex-row gap-5 items-center absolute top-1/2 right-1/4 hidden pointer-events-none'>
                                <div className='h-px w-8 bg-neutral-100'></div>
                                <div className="hidden md:block">
                                    <span className="text-neutral-100 font-mono tracking-widest text-base lg:text-lg">
                                        {item.tech}
                                    </span>
                                </div>
                                <span className="text-3xl md:text-4xl text-neutral-100">→</span>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
}

export default ContactSection;
