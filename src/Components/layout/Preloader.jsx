import React, { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";

function HTMLContent({ onDone }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, v => `${Math.round(v)}%`);

    useEffect(() => {
        const controls = animate(count, 100, {
            duration: 3,
            onComplete: onDone,
        });
        return () => controls.stop();
    }, []);

    return (
        <motion.pre className='font-poppins md:text-[250px] text-6xl' style={{ color: "#fff", fontWeight: 600 }}>
            {rounded}
        </motion.pre>
    );
}

export function Preloader({ done, onComplete }) {
    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-200 bg-neutral-950 flex justify-center items-center"
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                    <div className="h-[0.5px] w-full bg-gray-700"></div>

                    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <HTMLContent onDone={onComplete} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Preloader;
