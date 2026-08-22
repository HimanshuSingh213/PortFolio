import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";

const texts = [
    "Frontend Engineer",
    "UI Motion Designer",
    "React Developer",
    "Full-Stack Developer",
];

export function TextCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % texts.length);
        }, 2500);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative h-12 w-full overflow-hidden">
            {texts.map((text, i) => {
                const offset = (i - index) * 48;

                return (
                    <motion.div
                        key={i}
                        className="absolute left-0 top-0 w-full h-full flex items-center text-neutral-400 text-sm font-inter"
                        animate={{
                            y: offset,
                            opacity: i === index ? 1 : 0,
                        }}
                        transition={{
                            y: { duration: 1.5, ease: [0.44, 0.66, 0.36, 1] },
                            opacity: { duration: 0.1, ease: "easeOut" },
                        }}
                    >
                        {text}
                    </motion.div>
                );
            })}
        </div>
    );
}

export default TextCarousel;
