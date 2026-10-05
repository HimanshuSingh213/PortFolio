import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { siteConfig } from '../../config/site';
import { useResume } from '../../context/ResumeContext';

const XIcon = ({ className = "size-4", ...props }) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        {...props}
    >
        <path
            fill="currentColor"
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
        />
    </svg>
);

const HomeIcon = ({ className = "size-4", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
    >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const GithubIcon = ({ className = "size-4", ...props }) => (
    <svg
        viewBox="0 0 438.549 438.549"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="currentColor"
        aria-hidden="true"
        {...props}
    >
        <path
            d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
        />
    </svg>
);

const WorkIcon = ({ className = "size-4", ...props }) => (
    <svg
        viewBox="4 4 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="currentColor"
        aria-hidden="true"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 7.00013H15V12.0001H9V7.00013ZM10.5 8.50013V10.5001H13.5V8.50013H10.5Z"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 4.00024H6V6.00016H4V7.50016H6V11.0112H4V12.5112H6V16.0223H4V17.5223H6V20.0002H18V4.00024ZM7.5 5.50024V18.5002H16.5V5.50024H7.5Z"
        />
    </svg>
);

const ResumeIcon = ({ className = "size-4", ...props }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

const ICONS = [
    {
        src: <HomeIcon className="size-4 sm:size-4.5 md:size-5" />,
        label: "Home",
        action: "scroll-top",
    },
    {
        src: <WorkIcon className="size-4 sm:size-4.5 md:size-5" />,
        label: "Work",
        action: "scroll-to-Work",
    },
    {
        src: <GithubIcon className="size-4 sm:size-4.5 md:size-5" />,
        label: "GitHub",
        href: "https://github.com/HimanshuSingh213",
    },
    {
        src: <XIcon className="size-4 sm:size-4.5 md:size-5" />,
        label: "X",
        href: "https://x.com/HimanshuInTech",
    },
    {
        src: <ResumeIcon className="size-4 sm:size-4.5 md:size-5" />,
        label: "Resume",
        action: "open-resume",
        href: siteConfig.resumeUrl,
    },
];

function Tooltip({ children, label }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}

            <AnimatePresence>
                {hover && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: -35, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute z-50 pointer-events-none hidden md:block"
                    >
                        <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-[11px] px-2 py-1 rounded shadow-xl whitespace-nowrap font-medium font-mono">
                            {label}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 border-r border-b border-zinc-800 rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DockItem({ mouseX, src, label, href, action }) {
    const ref = useRef(null);
    const { openResume } = useResume();

    const distance = useTransform(mouseX, (x) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return 0;
        return x - (bounds.left + bounds.width / 2);
    });

    const rawScale = useTransform(distance, [-100, 0, 100], [1, 1.15, 1]);
    const rawMargin = useTransform(distance, [-100, 0, 100], [1, 6, 1]);

    const scale = useSpring(rawScale, { stiffness: 180, damping: 26 });
    const marginX = useSpring(rawMargin, { stiffness: 160, damping: 28 });

    const commonProps = {
        ref,
        style: {
            scale,
            marginLeft: marginX,
            marginRight: marginX,
        },
        className:
            "group flex items-center justify-center size-8 sm:size-8.5 md:size-9 rounded-xl cursor-pointer transition-colors hover:bg-neutral-800 shrink-0 active:scale-95"
    };

    const content = (
        <div className="text-neutral-400 group-hover:text-white transition-colors flex items-center justify-center">
            {src}
        </div>
    );

    return (
        <Tooltip label={label}>
            {action ? (
                <motion.button
                    {...commonProps}
                    aria-label={label}
                    onClick={(e) => {
                        if (action === "scroll-top") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }

                        if (action === "scroll-to-Work") {
                            document.getElementById("work")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }

                        if (action === "open-resume") {
                            openResume(e);
                        }
                    }}
                >
                    {content}
                </motion.button>
            ) : (
                <motion.a
                    {...commonProps}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {content}
                </motion.a>
            )}
        </Tooltip>
    );
}

export function MagneticDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <nav
            aria-label="Quick navigation"
            className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-90 max-w-[calc(100vw-24px)]"
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            <div className="flex items-center px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
                {ICONS.map((icon, i) => (
                    <React.Fragment key={i}>
                        <DockItem mouseX={mouseX} {...icon} />
                        {i !== ICONS.length - 1 && (
                            <div aria-hidden="true" className="h-3.5 sm:h-4 md:h-5 w-px bg-neutral-800 mx-0.5 sm:mx-1 md:mx-2 shrink-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
}

export default MagneticDock;
