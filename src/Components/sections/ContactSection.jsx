import React, { useState } from 'react';
import { motion } from "motion/react";

const items = [
    { id: "01", title: "EMAIL", tech: "himanshusingh213@zohomail.in", a: "mailto:himanshusingh213@zohomail.in" },
    { id: "02", title: "GITHUB", tech: "@HimanshuSingh213", a: "https://github.com/HimanshuSingh213" },
    { id: "03", title: "LINKEDIN", tech: "@himanshu-singh-dangi", a: "https://www.linkedin.com/in/himanshu-singh-dangi-631869372/" },
    { id: "04", title: "TWITTER", tech: "@HimanshuInTech", a: "https://x.com/HimanshuInTech" },
];

export function ContactSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="w-full">
            <h3 className='text-xs text-amber-600 border border-amber-600 rounded-xl text-left my-4 w-fit px-2 py-1 font-space tracking-wide'>
                Say Hello
            </h3>

            <div className="flex flex-col w-full py-10">
                {items.map((item, i) => (
                    <motion.a
                        key={item.id}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{
                            x: hoveredIndex === i ? 20 : hoveredIndex === null ? 0 : -20,
                            opacity: hoveredIndex === null ? 1 : hoveredIndex === i ? 1 : 0.25,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        target='_blank'
                        href={item.a}
                        rel="noopener noreferrer"
                        className="group border-b border-neutral-800 py-8 px-4 flex items-center justify-between cursor-pointer relative"
                    >
                        <div className="flex items-center gap-8 font-space tracking-tight">
                            <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">
                                {item.title}
                            </h2>
                        </div>

                        <div className='group-hover:opacity-100 opacity-0 transition duration-200 ease-in-out lg:flex flex-row gap-5 items-center absolute top-1/2 right-1/4 hidden'>
                            <div className='h-px w-8 bg-neutral-100'></div>
                            <div className="hidden md:block">
                                <span className="text-neutral-100 font-mono tracking-widest text-lg">
                                    {item.tech}
                                </span>
                            </div>
                            <span className="text-4xl text-neutral-100">→</span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

export default ContactSection;
