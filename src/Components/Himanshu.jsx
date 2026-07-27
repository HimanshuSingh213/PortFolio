import React, { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "motion/react";
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Lenis from '@studio-freight/lenis';
import { projects } from '../data/projects';
import { Github, ArrowUpRight } from 'lucide-react';
import { HalftoneSVG } from '../SVGs/Halftone';
import { CrossesSVG } from '../SVGs/Crosses';
import { TechSquaresSVG } from '../SVGs/TechSquares';
import { GrungeSVG } from '../SVGs/Grunge';
import { PixelGradientSVG } from '../SVGs/PixelGradient';
import { GridFadeSVG } from '../SVGs/GridFade';
import { TextSVG } from '../SVGs/Text';

function HTMLContent({ onDone }) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, v => `${Math.round(v)}%`)

    useEffect(() => {
        const controls = animate(count, 100, {
            duration: 3,
            onComplete: onDone,
        })
        return () => controls.stop()
    }, [])

    return <motion.pre className='font-poppins md:text-[250px] text-6xl' style={{ color: "#fff", fontWeight: 600 }}>{rounded}</motion.pre>
}


const texts = [
    "Frontend Engineer",
    "UI Motion Designer",
    "React Developer",
    "Full-Stack Developer",
];

function TextCarousel() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(i => (i + 1) % texts.length)
        }, 2500)

        return () => clearInterval(id)
    }, [])

    return (
        <div className="relative h-12 w-full overflow-hidden">
            {texts.map((text, i) => {
                const offset = (i - index) * 48

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
                )
            })}
        </div>
    )
}


const XIcon = ({ className = "size-4", ...props }) => {
    return (
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
};

const HomeIcon = ({ className = "size-4", ...props }) => {
    return (
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
};

const GithubIcon = ({ className = "size-4", ...props }) => {
    return (
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
};

const WorkIcon = ({ className = "size-4", ...props }) => {
    return (
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
};

const items = [
    { id: "01", title: "EMAIL", tech: "himanshusingh213@zohomail.in", a: "mailto:himanshusingh213@zohomail.in" },
    { id: "02", title: "GITHUB", tech: "@HimanshuSingh213", a: "https://github.com/HimanshuSingh213" },
    { id: "03", title: "LINKEDIN", tech: "@himanshu-singh-dangi", a: "https://www.linkedin.com/in/himanshu-singh-dangi-631869372/" },
    { id: "04", title: "TWITTER", tech: "@HimanshuInTech", a: "https://x.com/HimanshuInTech" },
];

function ConnectionRedirects() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="flex flex-col w-full py-10">
            {items.map((item, i) => (
                <motion.a
                    key={i}
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
                    href={`${item.a}`}
                    rel="noopener noreferrer"
                    className="group border-b border-neutral-800 py-8 px-4 flex items-center justify-between cursor-pointer relative group"
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
    );
}

const ICONS = [
    {
        src: <HomeIcon className="size-5" />,
        label: "Home",
        action: "scroll-top",
    },
    {
        src: <WorkIcon className="size-5" />,
        label: "Work",
        action: "scroll-to-Work",
    },
    {
        src: <GithubIcon className="size-5" />,
        label: "GitHub",
        href: "https://github.com/HimanshuSingh213",
    },
    {
        src: <XIcon className="size-5" />,
        label: "X",
        href: "https://x.com/HimanshuInTech",
    },
];


function MagneticDock() {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                mass: 0.6,
                delay: 0.2,
            }}
            style={{ transformOrigin: "50% 100%" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-90"
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            <div className="flex items-center px-1 py-2 rounded-3xl bg-neutral-900 backdrop-blur-md border border-white/10">
                {ICONS.map((icon, i) => (
                    <React.Fragment key={i}>
                        <DockItem mouseX={mouseX} {...icon} />

                        {i !== ICONS.length - 1 && (
                            <div className="h-5 w-px bg-neutral-700 mx-3" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </motion.div>
    );
}


function DockItem({ mouseX, src, label, href, action }) {
    const ref = React.useRef(null);

    const distance = useTransform(mouseX, (x) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return 0;
        return x - (bounds.left + bounds.width / 2);
    });

    const rawScale = useTransform(distance, [-100, 0, 100], [1, 1.1, 1]);
    const rawMargin = useTransform(distance, [-120, 0, 120], [6, 14, 6]);

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
            "group flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-colors hover:bg-neutral-800"
    };

    const content = (
        <div className="text-neutral-400 group-hover:text-white transition-colors">
            {src}
        </div>
    );

    return (
        <Tooltip label={label}>
            {action ? (
                <motion.button
                    {...commonProps}
                    onClick={() => {
                        if (action === "scroll-top") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }

                        if (action === "scroll-to-Work") {
                            document.getElementById("work")?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    }}
                >
                    {content}
                </motion.button>
            ) : (
                <motion.a
                    {...commonProps}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {content}
                </motion.a>
            )}
        </Tooltip>
    );

}


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
                        className="absolute z-50 pointer-events-none"
                    >
                        <div className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-[11px] px-2 py-1 rounded shadow-xl whitespace-nowrap font-medium">
                            {label}
                            {/* Little Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 border-r border-b border-zinc-800 rotate-45" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const patterns = [
    "Dots Grid",
    "Waves",
    "Halftone",
    "Crosses",
    "Tech Squares",
    "Pixel Gradient",
    "Grunge",
    "Pixel Gradient"
];

function PatternSelector() {
    const [active, setActive] = useState("Dots Grid");

    useEffect(() => {
        const index = Math.floor(Math.random() * patterns.length);
        setActive(patterns[index]);
    }, []);

    const handleClick = (pattern) => {
        setActive(pattern);

    };

    return (
        <>
            <ProfilePoster pattern={active} />
            <div className="hidden md:grid absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-transparent p-1 rounded-md grid-cols-3 gap-1">
                <button onClick={() => handleClick("Dots Grid")}
                    className={`${active === "Dots Grid" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Dots Grid">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="2" cy="2" r="1"></circle><circle cx="6" cy="2" r="1"></circle><circle cx="10" cy="2" r="1"></circle><circle cx="2" cy="6" r="1"></circle><circle cx="6" cy="6" r="1"></circle><circle cx="10" cy="6" r="1"></circle><circle cx="2" cy="10" r="1"></circle><circle cx="6" cy="10" r="1"></circle><circle cx="10" cy="10" r="1"></circle></svg>
                </button>
                <button onClick={() => handleClick("Waves")}
                    className={`${active === "Waves" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Waves">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6 A 6 6 0 0 1 12 6"></path><path d="M-6 12 A 6 6 0 0 1 6 12"></path><path d="M6 12 A 6 6 0 0 1 18 12"></path></svg>
                </button>
                <button onClick={() => handleClick("Halftone")}
                    className={`${active === "Halftone" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent  border-transparent `} title="Halftone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="2" cy="6" r="1.5"></circle><circle cx="6" cy="6" r="1"></circle><circle cx="10" cy="6" r="0.5"></circle></svg>
                </button>
                <button onClick={() => handleClick("Crosses")}
                    className={`${active === "Crosses" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Crosses">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 1v2m0 2v-2m-1 0h2"></path><path d="M6 1v2m0 2v-2m-1 0h2"></path><path d="M10 1v2m0 2v-2m-1 0h2"></path><path d="M2 5v2m0 2v-2m-1 0h2"></path><path d="M6 5v2m0 2v-2m-1 0h2"></path><path d="M10 5v2m0 2v-2m-1 0h2"></path></svg>
                </button>
                <button onClick={() => handleClick("Tech Squares")}
                    className={`${active === "Tech Squares" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Tech Squares">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="2" width="5" height="5"></rect><rect x="6" y="6" width="4" height="4" opacity="0.5"></rect><rect x="1" y="8" width="2" height="2"></rect></svg>
                </button>
                <button onClick={() => handleClick("Grunge")}
                    className={`${active === "Grunge" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Grunge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 2 L3 4 L2 6 L5 10 L8 8 L11 11" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 1 L7 5 L9 8" opacity="0.5" strokeLinecap="round"></path></svg>
                </button>
                <button onClick={() => handleClick("Pixel Gradient")}
                    className={`${active === "Pixel Gradient" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Pixel Gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" opacity="1"></rect><rect x="4.5" y="0" width="3" height="3" opacity="1"></rect><rect x="9" y="0" width="3" height="3" opacity="0.8"></rect><rect x="0" y="4.5" width="3" height="3" opacity="0.6"></rect><rect x="4.5" y="4.5" width="3" height="3" opacity="0.4"></rect><rect x="9" y="4.5" width="3" height="3" opacity="0.2"></rect><rect x="0" y="9" width="3" height="3" opacity="0.1"></rect><rect x="4.5" y="9" width="3" height="3" opacity="0.05"></rect></svg>
                </button>
                <button onClick={() => handleClick("Grid Fade")}
                    className={`${active === "Grid Fade" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Grid Fade">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 0V12M8 0V12M0 4H12M0 8H12" vectorEffect="non-scaling-stroke"></path></svg>
                </button>
                <button onClick={() => handleClick("Text")}
                    className={`${active === "Text" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent `} title="Text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><text x="6" y="10" fontSize="10" fontWeight="bold" textAnchor="middle">T</text></svg>
                </button>
            </div></>
    );
}

function ProfilePoster({ pattern }) {

    if (pattern === "Dots Grid") return (
        <svg className="w-full h-full text-white opacity-[0.2]"><defs><pattern id="_r_17_" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1" fill="currentColor"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#_r_17_)"></rect></svg>
    )

    else if (pattern === "Waves") return (
        <svg className="w-full h-full text-white opacity-[0.2]"><defs><pattern id="_r_17_" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse"><g fill="none" stroke="currentColor" strokeWidth="1"><g><circle cx="12" cy="0" r="12"></circle><circle cx="12" cy="0" r="9.600000000000001"></circle><circle cx="12" cy="0" r="7.199999999999999"></circle><circle cx="12" cy="0" r="4.800000000000001"></circle><circle cx="12" cy="0" r="2.4000000000000004"></circle></g><g><circle cx="0" cy="12" r="12"></circle><circle cx="0" cy="12" r="9.600000000000001"></circle><circle cx="0" cy="12" r="7.199999999999999"></circle><circle cx="0" cy="12" r="4.800000000000001"></circle><circle cx="0" cy="12" r="2.4000000000000004"></circle></g><g><circle cx="24" cy="12" r="12"></circle><circle cx="24" cy="12" r="9.600000000000001"></circle><circle cx="24" cy="12" r="7.199999999999999"></circle><circle cx="24" cy="12" r="4.800000000000001"></circle><circle cx="24" cy="12" r="2.4000000000000004"></circle></g></g></pattern></defs><rect width="100%" height="100%" fill="url(#_r_17_)"></rect></svg>
    )

    else if (pattern === "Halftone") return (
        <HalftoneSVG/>
    )
    else if (pattern === "Crosses") return (
        <CrossesSVG/>
    )
    else if (pattern === "Tech Squares") return (
        <TechSquaresSVG/>
    )
    else if (pattern === "Grunge") return (
        <GrungeSVG/>
    )
    else if (pattern === "Pixel Gradient") return (
        <PixelGradientSVG/>
    )
    else if (pattern === "Grid Fade") return (
        <GridFadeSVG/>
    )
    else if (pattern === "Text") return (
        <TextSVG/>
    )

}



const renderDescription = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, index) => 
        index % 2 === 1 
            ? <em key={index} className="font-serif italic font-medium text-neutral-200">{part}</em> 
            : part
    );
};

const timeAgo = (dateString) => {
    if (!dateString) return "";
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
    if (diffDays < 30) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};


function Himanshu() {
    const [done, setDone] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [githubData, setGithubData] = useState({});
    const projectsPerPage = 2;
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const startIndex = (currentPage - 1) * projectsPerPage;
    const selectedProjects = projects.slice(startIndex, startIndex + projectsPerPage);

    useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/HimanshuSingh213/repos?per_page=100");
                if (response.ok) {
                    const repos = await response.json();
                    const dataMap = {};
                    repos.forEach(repo => {
                        dataMap[repo.name] = {
                            pushed_at: repo.pushed_at,
                            language: repo.language
                        };
                    });
                    setGithubData(dataMap);
                }
            } catch (error) {
                console.error("Failed to fetch Github data", error);
            }
        };

        fetchGithubRepos();
    }, []);


    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });


        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    }, []);

    useEffect(() => {
        if (!done) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        }
        else {
            setTimeout(() => {
                document.body.style.overflow = "";
                document.body.style.height = "";
            }, 1200);

        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, [done]);


    return (
        <>
            <div className='bg-neutral-950 flex flex-col items-center himanshu'>

                {/* Preloader */}
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

                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <HTMLContent onDone={() => {
                                    setInterval(() => {
                                        setDone(true)
                                    }, 400);
                                }} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Main site */}
                <div className='container mx-auto lg:max-w-5xl max-w-screen min-h-screen px-4 lg:p-0'>
                    {/* BG - Poster */}
                    <div className='md:h-62.5 h-37.5 -mx-4 lg:mx-0 overflow-hidden'>
                        <div className='w-full h-full flex justify-start relative group scale-125 md:scale-100 origin-[25%_50%] transition-transform duration-300'>

                            <PatternSelector />

                        </div>
                    </div>

                    {/* Name */}
                    <div className='flex w-full relative -top-12.5 gap-1 flex-col lg:flex-row'>
                        <img className='size-25 rounded-full '
                            src="https://pbs.twimg.com/profile_images/1956445565006295040/cumepmWE_400x400.jpg" alt="dp" />

                        <div className='flex flex-col'>
                            <div className='pt-12.5 h-14 w-full'></div>
                            <div className='flex flex-row gap-3 items-center h-12.5'>
                                <div className='flex gap-2 items-center flex-row'>
                                    <h1 className='text-neutral-100 font-bold lg:text-3xl text-xl text-nowrap'>Himanshu Singh Dangi</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 text-black dark:text-white select-none" aria-label="Verified"><path fill="currentColor" d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"></path></svg>
                                </div>
                                <div className='h-px w-8 bg-gray-700'></div>
                                <div className='w-3xs h-8 flex items-center'>
                                    <TextCarousel />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:w-6/12 w-full sm:w-full relative -top-6'>
                        <h3 className='text-sm text-neutral-400 font-inter'>
                            Building <span className='font-geist text-neutral-100 text-sm'>Interactive Web Applications</span> with a focus on <span className='font-geist text-neutral-100 text-sm'>Performance</span>  and  <span className='font-geist text-neutral-100 text-sm'>Clean Implementation</span>.
                            Working with <span className='font-geist text-neutral-100 text-sm capitalize'>modern frontend</span>  tools to create reliable, <span className='font-geist text-neutral-100 text-sm'>Scalable Interfaces</span>.

                        </h3>
                    </div>

                    {/* About section */}
                    <div className='w-full space-y-5 my-16'>
                        <h1 className='text-4xl text-neutral-700 font-geist font-semibold relative w-fit'>About Me<span className='h-px w-1/3 bg-neutral-400 absolute bottom-0 left-0'></span></h1>
                        <p className='text-lg text-neutral-500'>I’m <span className='font-space text-neutral-300'>Himanshu Singh Dangi</span>, a frontend-focused developer who enjoys building clean and

                            <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>simple<span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen"><svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current"><path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path></svg></span>
                            </span>

                            web experiences. I like turning ideas into

                            <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>real products<span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen"><svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current"><path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path></svg></span>
                            </span>

                            with attention to user interface, motion, and the

                            <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>small details<span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen"><svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current"><path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path></svg></span>
                            </span>


                            that make things feel right. I learn by building projects,


                            <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>experimenting <span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen"><svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current"><path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path></svg></span>
                            </span>

                            , and improving with every iteration.</p>
                    </div>

                    {/* Tech Stack */}
                    <div className='lg:text-8xl text-6xl text-neutral-800 relative top-7 font-inter font-bold h-full z-60 pointer-events-none select-none'>CAPABILITY</div>
                    <div className='lg:text-4xl text-2xl font-extralight text-left text-white z-70'>
                        <p style={{ marginLeft: "12px" }} className='z-70 relative'>TECH STACK</p>
                    </div>
                    <div style={{ marginLeft: "10px", marginTop: "6px", height: "1px" }} className='bg-neutral-200 rounded-lg w-12'></div>
                    <div style={{ marginTop: "30px" }} className='flex lg:flex-row flex-col lg:gap-0 gap-4 items-center'>
                        <div className="left flex flex-col gap-8 text-neutral-600 text-sm lg:w-1/3 text-center lg:text-left">
                            <h3>A curated list of technologies I use to build performant, scalable, and beautiful digital experiences.</h3>
                            <h3>Always exploring new tools to improve workflow and product quality.</h3>
                        </div>
                        <div className="right ml-10 lg:w-2/3">
                            <div className="frontend">
                                <div className="header flex flex-col">
                                    <div className='flex flex-row gap-2 items-center lg:justify-start'>
                                        <p className='text-xs text-amber-500 font-inter'>01</p>
                                        <h1 className='lg:text-3xl text-2xl font-light font-space text-white'>Frontend Architecture</h1>
                                    </div>
                                    <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full mb-5'></div>
                                </div>
                                <div className='grid grid-cols-2 grid-rows-4 gap-5'>
                                    {/* JavaScript */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREYSCALE */}
                                                    <svg
                                                        className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                                        viewBox="0 0 256 256"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 0h256v256H0V0z" fill="#2a2a2a" />
                                                        <path
                                                            fill="#8a8a8a"
                                                            d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                                                        />
                                                    </svg>

                                                    {/* COLORED*/}
                                                    <svg
                                                        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                                        viewBox="0 0 256 256"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0 0h256v256H0V0z" fill="#F7DF1E" />
                                                        <path
                                                            fill="#000000"
                                                            d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                                                        />
                                                    </svg>
                                                </div>

                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>JavaScript</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">ES6+</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* TypeScript */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 256 256"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <polygon
                                                            fill="#1f2933"
                                                            points="0 128 0 0 128 0 256 0 256 128 256 256 128 256 0 256"
                                                            transform="translate(128 128) scale(1,-1) translate(-128,-128)"
                                                        />

                                                        <path
                                                            fill="#9ca3af"
                                                            d="M146.658132,223.436863 L146.739401,212.953054 L130.079084,212.953054 L113.418767,212.953054 L113.418767,165.613371 L113.418767,118.273689 L101.63464,118.273689 L89.8505126,118.273689 L89.8505126,165.613371 L89.8505126,212.953054 L73.1901951,212.953054 L56.5298776,212.953054 L56.5298776,223.233689 C56.5298776,228.922577 56.6517824,233.676863 56.8143221,233.798768 C56.9362269,233.961308 77.2130522,234.042577 101.797179,234.001943 L146.536227,233.880038 L146.658132,223.436863 Z"
                                                            transform="translate(101.63464 176.142993) rotate(-180) translate(-101.63464 -176.142993)"
                                                        />

                                                        <path
                                                            fill="#9ca3af"
                                                            d="M206.566631,234.272145 C213.068219,232.646748 218.025679,229.761668 222.57679,225.048018 C224.933616,222.528653 228.428219,217.936907 228.712663,216.839764 C228.793933,216.514684 217.659965,209.037859 210.914568,204.852462 C210.670758,204.689922 209.69552,205.74643 208.598377,207.371827 C205.306949,212.166748 201.852981,214.239129 196.570441,214.604843 C188.809171,215.133097 183.811076,211.069605 183.851711,204.283573 C183.851711,202.292462 184.136155,201.114049 184.948854,199.488653 C186.65552,195.953414 189.825044,193.840399 199.7806,189.533097 C218.106949,181.649922 225.949489,176.448653 230.825679,169.053097 C236.270758,160.804208 237.489806,147.638494 233.792028,137.845478 C229.728536,127.199129 219.651076,119.966113 205.469489,117.568653 C201.080917,116.796589 190.678377,116.918494 185.964727,117.771827 C175.684092,119.600399 165.931711,124.679764 159.917743,131.343891 C157.560917,133.944526 152.969171,140.730557 153.253616,141.218176 C153.37552,141.380716 154.432028,142.030875 155.610441,142.721668 C156.748219,143.371827 161.05552,145.850557 165.119012,148.207383 L172.473933,152.474049 L174.01806,150.198494 C176.171711,146.907065 180.885362,142.396589 183.729806,140.893097 C191.897425,136.585795 203.112663,137.195319 208.639012,142.15278 C210.995838,144.30643 211.971076,146.541351 211.971076,149.83278 C211.971076,152.799129 211.605362,154.099446 210.061235,156.334367 C208.070123,159.178811 204.006631,161.576272 192.466314,166.574367 C179.259965,172.263256 173.571076,175.798494 168.369806,181.406113 C165.362822,184.656907 162.518377,189.858176 161.339965,194.206113 C160.364727,197.822621 160.120917,206.884208 160.892981,210.541351 C163.61552,223.300716 173.245996,232.199764 187.143139,234.841034 C191.653616,235.694367 202.137425,235.369287 206.566631,234.272145 Z"
                                                            transform="translate(194.578507 176.19024) scale(1,-1) translate(-194.578507 -176.19024)"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="0 0 256 256"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <polygon
                                                            fill="#007ACC"
                                                            points="0 128 0 0 128 0 256 0 256 128 256 256 128 256 0 256"
                                                            transform="translate(128 128) scale(1,-1) translate(-128,-128)"
                                                        />

                                                        <path
                                                            fill="#FFFFFF"
                                                            d="M146.658132,223.436863 L146.739401,212.953054 L130.079084,212.953054 L113.418767,212.953054 L113.418767,165.613371 L113.418767,118.273689 L101.63464,118.273689 L89.8505126,118.273689 L89.8505126,165.613371 L89.8505126,212.953054 L73.1901951,212.953054 L56.5298776,212.953054 L56.5298776,223.233689 C56.5298776,228.922577 56.6517824,233.676863 56.8143221,233.798768 C56.9362269,233.961308 77.2130522,234.042577 101.797179,234.001943 L146.536227,233.880038 L146.658132,223.436863 Z"
                                                            transform="translate(101.63464 176.142993) rotate(-180) translate(-101.63464 -176.142993)"
                                                        />

                                                        <path
                                                            fill="#FFFFFF"
                                                            d="M206.566631,234.272145 C213.068219,232.646748 218.025679,229.761668 222.57679,225.048018 C224.933616,222.528653 228.428219,217.936907 228.712663,216.839764 C228.793933,216.514684 217.659965,209.037859 210.914568,204.852462 C210.670758,204.689922 209.69552,205.74643 208.598377,207.371827 C205.306949,212.166748 201.852981,214.239129 196.570441,214.604843 C188.809171,215.133097 183.811076,211.069605 183.851711,204.283573 C183.851711,202.292462 184.136155,201.114049 184.948854,199.488653 C186.65552,195.953414 189.825044,193.840399 199.7806,189.533097 C218.106949,181.649922 225.949489,176.448653 230.825679,169.053097 C236.270758,160.804208 237.489806,147.638494 233.792028,137.845478 C229.728536,127.199129 219.651076,119.966113 205.469489,117.568653 C201.080917,116.796589 190.678377,116.918494 185.964727,117.771827 C175.684092,119.600399 165.931711,124.679764 159.917743,131.343891 C157.560917,133.944526 152.969171,140.730557 153.253616,141.218176 C153.37552,141.380716 154.432028,142.030875 155.610441,142.721668 C156.748219,143.371827 161.05552,145.850557 165.119012,148.207383 L172.473933,152.474049 L174.01806,150.198494 C176.171711,146.907065 180.885362,142.396589 183.729806,140.893097 C191.897425,136.585795 203.112663,137.195319 208.639012,142.15278 C210.995838,144.30643 211.971076,146.541351 211.971076,149.83278 C211.971076,152.799129 211.605362,154.099446 210.061235,156.334367 C208.070123,159.178811 204.006631,161.576272 192.466314,166.574367 C179.259965,172.263256 173.571076,175.798494 168.369806,181.406113 C165.362822,184.656907 162.518377,189.858176 161.339965,194.206113 C160.364727,197.822621 160.120917,206.884208 160.892981,210.541351 C163.61552,223.300716 173.245996,232.199764 187.143139,234.841034 C191.653616,235.694367 202.137425,235.369287 206.566631,234.272145 Z"
                                                            transform="translate(194.578507 176.19024) scale(1,-1) translate(-194.578507 -176.19024)"
                                                        />

                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>TypeScript</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Structural Typing</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* React JS */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 -14 256 256"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 L210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 L204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 L193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,217.298414 73.1160375,217.378157 69.3211631,215.189998 C61.2461189,210.532528 57.8891498,192.554265 62.4682434,168.438039 C62.9927272,165.676183 63.6170041,162.839142 64.3365173,159.939216 C74.8234575,162.258154 86.4299951,163.926841 98.8353334,164.932519 C105.918826,174.899534 113.336329,184.06091 120.811247,192.08264 C119.178102,193.65928 117.551336,195.16028 115.933685,196.574699 C106.001303,205.256705 96.0479605,211.41654 87.2761866,214.514686 L87.2761866,214.514686 Z M50.3486141,144.746959 C37.8658105,140.48046 27.5570398,134.935332 20.4908634,128.884403 C14.1414664,123.446815 10.9357817,118.048415 10.9357817,113.667995 C10.9357817,104.34622 24.8334611,92.4562517 48.0123604,84.3748281 C50.8247961,83.3942121 53.7689223,82.4701001 56.8242337,81.6020363 C60.0276398,92.0224477 64.229889,102.917218 69.3011135,113.93411 C64.1642716,125.11459 59.9023288,136.182975 56.6674809,146.725506 C54.489347,146.099407 52.3791089,145.440499 50.3486141,144.746959 L50.3486141,144.746959 Z M62.7270678,60.4878073 C57.9160346,35.9004118 61.1112387,17.3525532 69.1516515,12.6982729 C77.7160924,7.74005624 96.6544653,14.8094222 116.614922,32.5329619 C117.890816,33.6657739 119.171723,34.8514442 120.456275,36.0781256 C113.018267,44.0647686 105.66866,53.1573386 98.6480514,63.0655695 C86.6081646,64.1815215 75.0831931,65.9741531 64.4868907,68.3746571 C63.8206914,65.6948233 63.2305903,63.0619242 62.7270678,60.4878073 L62.7270678,60.4878073 Z M173.153901,87.7550367 C170.620796,83.3796304 168.020249,79.1076627 165.369124,74.9523483 C173.537126,75.9849113 181.362914,77.3555864 188.712066,79.0329319 C186.505679,86.1041206 183.755673,93.4974728 180.518546,101.076741 C178.196419,96.6680702 175.740322,92.2229454 173.153901,87.7550367 L173.153901,87.7550367 Z M128.122121,43.8938899 C133.166461,49.3588189 138.218091,55.4603279 143.186789,62.0803968 C138.179814,61.8439007 133.110868,61.720868 128.000001,61.720868 C122.937434,61.720868 117.905854,61.8411667 112.929865,62.0735617 C117.903575,55.515009 122.99895,49.4217021 128.122121,43.8938899 L128.122121,43.8938899 Z M82.8018984,87.830679 C80.2715265,92.2183886 77.8609975,96.6393627 75.5753239,101.068539 C72.3906004,93.5156998 69.6661103,86.0886276 67.440586,78.9171899 C74.7446255,77.2826781 82.5335049,75.9461789 90.6495601,74.9332099 C87.9610684,79.1268011 85.3391054,83.4302106 82.8018984,87.8297677 L82.8018984,87.830679 L82.8018984,87.830679 Z M90.8833221,153.182899 C82.4979621,152.247395 74.5919739,150.979704 67.289757,149.390303 C69.5508242,142.09082 72.3354636,134.505173 75.5876271,126.789657 C77.8792246,131.215644 80.2993228,135.638441 82.8451877,140.03572 L82.8456433,140.03572 C85.4388987,144.515476 88.1255676,148.90364 90.8833221,153.182899 L90.8833221,153.182899 Z M128.424691,184.213105 C123.24137,178.620587 118.071264,172.434323 113.021912,165.780078 C117.923624,165.972373 122.921029,166.0708 128.000001,166.0708 C133.217953,166.0708 138.376211,165.953235 143.45336,165.727219 C138.468257,172.501308 133.434855,178.697141 128.424691,184.213105 L128.424691,184.213105 Z M180.622896,126.396409 C184.044571,134.195313 186.929004,141.741317 189.219234,148.9164 C181.796719,150.609693 173.782736,151.973534 165.339049,152.986959 C167.996555,148.775595 170.619884,144.430263 173.197646,139.960532 C175.805484,135.438399 178.28163,130.90943 180.622896,126.396409 L180.622896,126.396409 Z M163.724586,134.496971 C159.722835,141.435557 155.614455,148.059271 151.443648,154.311611 C143.847063,154.854776 135.998946,155.134562 128.000001,155.134562 C120.033408,155.134562 112.284171,154.887129 104.822013,154.402745 C100.48306,148.068386 96.285368,141.425078 92.3091341,134.556664 L92.3100455,134.556664 C88.3442923,127.706935 84.6943232,120.799333 81.3870228,113.930466 C84.6934118,107.045648 88.3338117,100.130301 92.276781,93.292874 L92.2758697,93.294241 C96.2293193,86.4385872 100.390102,79.8276317 104.688954,73.5329157 C112.302398,72.9573964 120.109505,72.6571055 127.999545,72.6571055 L128.000001,72.6571055 C135.925583,72.6571055 143.742714,72.9596746 151.353879,73.5402067 C155.587114,79.7888993 159.719645,86.3784378 163.688588,93.2350031 C167.702644,100.168578 171.389978,107.037901 174.724618,113.77508 C171.400003,120.627999 167.720871,127.566587 163.724586,134.496971 L163.724586,134.496971 Z M186.284677,12.3729198 C194.857321,17.3165548 198.191049,37.2542268 192.804953,63.3986692 C192.461372,65.0669011 192.074504,66.7661189 191.654369,68.4881206 C181.03346,66.0374921 169.500286,64.2138746 157.425315,63.0810626 C150.391035,53.0639249 143.101577,43.9572289 135.784778,36.073113 C137.751934,34.1806885 139.716356,32.3762092 141.672575,30.673346 C160.572216,14.2257007 178.236518,7.73185406 186.284677,12.3729198 L186.284677,12.3729198 Z M128.000001,90.8080696 C140.624975,90.8080696 150.859926,101.042565 150.859926,113.667995 C150.859926,126.292969 140.624975,136.527922 128.000001,136.527922 C115.375026,136.527922 105.140075,126.292969 105.140075,113.667995 C105.140075,101.042565 115.375026,90.8080696 128.000001,90.8080696 L128.000001,90.8080696 Z"
                                                        />
                                                    </svg>

                                                    {/* COLOR*/}
                                                    <svg
                                                        viewBox="0 -14 256 256"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <path
                                                            fill="#00D8FF"
                                                            d="M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 L210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 L204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 L193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,217.298414 73.1160375,217.378157 69.3211631,215.189998 C61.2461189,210.532528 57.8891498,192.554265 62.4682434,168.438039 C62.9927272,165.676183 63.6170041,162.839142 64.3365173,159.939216 C74.8234575,162.258154 86.4299951,163.926841 98.8353334,164.932519 C105.918826,174.899534 113.336329,184.06091 120.811247,192.08264 C119.178102,193.65928 117.551336,195.16028 115.933685,196.574699 C106.001303,205.256705 96.0479605,211.41654 87.2761866,214.514686 L87.2761866,214.514686 Z M50.3486141,144.746959 C37.8658105,140.48046 27.5570398,134.935332 20.4908634,128.884403 C14.1414664,123.446815 10.9357817,118.048415 10.9357817,113.667995 C10.9357817,104.34622 24.8334611,92.4562517 48.0123604,84.3748281 C50.8247961,83.3942121 53.7689223,82.4701001 56.8242337,81.6020363 C60.0276398,92.0224477 64.229889,102.917218 69.3011135,113.93411 C64.1642716,125.11459 59.9023288,136.182975 56.6674809,146.725506 C54.489347,146.099407 52.3791089,145.440499 50.3486141,144.746959 L50.3486141,144.746959 Z M62.7270678,60.4878073 C57.9160346,35.9004118 61.1112387,17.3525532 69.1516515,12.6982729 C77.7160924,7.74005624 96.6544653,14.8094222 116.614922,32.5329619 C117.890816,33.6657739 119.171723,34.8514442 120.456275,36.0781256 C113.018267,44.0647686 105.66866,53.1573386 98.6480514,63.0655695 C86.6081646,64.1815215 75.0831931,65.9741531 64.4868907,68.3746571 C63.8206914,65.6948233 63.2305903,63.0619242 62.7270678,60.4878073 L62.7270678,60.4878073 Z M173.153901,87.7550367 C170.620796,83.3796304 168.020249,79.1076627 165.369124,74.9523483 C173.537126,75.9849113 181.362914,77.3555864 188.712066,79.0329319 C186.505679,86.1041206 183.755673,93.4974728 180.518546,101.076741 C178.196419,96.6680702 175.740322,92.2229454 173.153901,87.7550367 L173.153901,87.7550367 Z M128.122121,43.8938899 C133.166461,49.3588189 138.218091,55.4603279 143.186789,62.0803968 C138.179814,61.8439007 133.110868,61.720868 128.000001,61.720868 C122.937434,61.720868 117.905854,61.8411667 112.929865,62.0735617 C117.903575,55.515009 122.99895,49.4217021 128.122121,43.8938899 L128.122121,43.8938899 Z M82.8018984,87.830679 C80.2715265,92.2183886 77.8609975,96.6393627 75.5753239,101.068539 C72.3906004,93.5156998 69.6661103,86.0886276 67.440586,78.9171899 C74.7446255,77.2826781 82.5335049,75.9461789 90.6495601,74.9332099 C87.9610684,79.1268011 85.3391054,83.4302106 82.8018984,87.8297677 L82.8018984,87.830679 L82.8018984,87.830679 Z M90.8833221,153.182899 C82.4979621,152.247395 74.5919739,150.979704 67.289757,149.390303 C69.5508242,142.09082 72.3354636,134.505173 75.5876271,126.789657 C77.8792246,131.215644 80.2993228,135.638441 82.8451877,140.03572 L82.8456433,140.03572 C85.4388987,144.515476 88.1255676,148.90364 90.8833221,153.182899 L90.8833221,153.182899 Z M128.424691,184.213105 C123.24137,178.620587 118.071264,172.434323 113.021912,165.780078 C117.923624,165.972373 122.921029,166.0708 128.000001,166.0708 C133.217953,166.0708 138.376211,165.953235 143.45336,165.727219 C138.468257,172.501308 133.434855,178.697141 128.424691,184.213105 L128.424691,184.213105 Z M180.622896,126.396409 C184.044571,134.195313 186.929004,141.741317 189.219234,148.9164 C181.796719,150.609693 173.782736,151.973534 165.339049,152.986959 C167.996555,148.775595 170.619884,144.430263 173.197646,139.960532 C175.805484,135.438399 178.28163,130.90943 180.622896,126.396409 L180.622896,126.396409 Z M163.724586,134.496971 C159.722835,141.435557 155.614455,148.059271 151.443648,154.311611 C143.847063,154.854776 135.998946,155.134562 128.000001,155.134562 C120.033408,155.134562 112.284171,154.887129 104.822013,154.402745 C100.48306,148.068386 96.285368,141.425078 92.3091341,134.556664 L92.3100455,134.556664 C88.3442923,127.706935 84.6943232,120.799333 81.3870228,113.930466 C84.6934118,107.045648 88.3338117,100.130301 92.276781,93.292874 L92.2758697,93.294241 C96.2293193,86.4385872 100.390102,79.8276317 104.688954,73.5329157 C112.302398,72.9573964 120.109505,72.6571055 127.999545,72.6571055 L128.000001,72.6571055 C135.925583,72.6571055 143.742714,72.9596746 151.353879,73.5402067 C155.587114,79.7888993 159.719645,86.3784378 163.688588,93.2350031 C167.702644,100.168578 171.389978,107.037901 174.724618,113.77508 C171.400003,120.627999 167.720871,127.566587 163.724586,134.496971 L163.724586,134.496971 Z M186.284677,12.3729198 C194.857321,17.3165548 198.191049,37.2542268 192.804953,63.3986692 C192.461372,65.0669011 192.074504,66.7661189 191.654369,68.4881206 C181.03346,66.0374921 169.500286,64.2138746 157.425315,63.0810626 C150.391035,53.0639249 143.101577,43.9572289 135.784778,36.073113 C137.751934,34.1806885 139.716356,32.3762092 141.672575,30.673346 C160.572216,14.2257007 178.236518,7.73185406 186.284677,12.3729198 L186.284677,12.3729198 Z M128.000001,90.8080696 C140.624975,90.8080696 150.859926,101.042565 150.859926,113.667995 C150.859926,126.292969 140.624975,136.527922 128.000001,136.527922 C115.375026,136.527922 105.140075,126.292969 105.140075,113.667995 C105.140075,101.042565 115.375026,90.8080696 128.000001,90.8080696 L128.000001,90.8080696 Z"
                                                        />
                                                    </svg>
                                                </div>

                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>React.js</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">v19+, Server Components</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* Next JS */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M23.749 30.005c-0.119 0.063-0.109 0.083 0.005 0.025 0.037-0.015 0.068-0.036 0.095-0.061 0-0.021 0-0.021-0.1 0.036zM23.989 29.875c-0.057 0.047-0.057 0.047 0.011 0.016 0.036-0.021 0.068-0.041 0.068-0.047 0-0.027-0.016-0.021-0.079 0.031zM24.145 29.781c-0.057 0.047-0.057 0.047 0.011 0.016 0.037-0.021 0.068-0.043 0.068-0.048 0-0.025-0.016-0.020-0.079 0.032zM24.303 29.688c-0.057 0.047-0.057 0.047 0.009 0.015 0.037-0.020 0.068-0.041 0.068-0.047 0-0.025-0.016-0.020-0.077 0.032zM24.516 29.547c-0.109 0.073-0.147 0.12-0.047 0.068 0.067-0.041 0.181-0.131 0.161-0.131-0.043 0.016-0.079 0.043-0.115 0.063zM14.953 0.011c-0.073 0.005-0.292 0.025-0.484 0.041-4.548 0.412-8.803 2.86-11.5 6.631-1.491 2.067-2.459 4.468-2.824 6.989-0.129 0.88-0.145 1.14-0.145 2.333 0 1.192 0.016 1.448 0.145 2.328 0.871 6.011 5.147 11.057 10.943 12.927 1.043 0.333 2.136 0.563 3.381 0.704 0.484 0.052 2.577 0.052 3.061 0 2.152-0.24 3.969-0.771 5.767-1.688 0.276-0.14 0.328-0.177 0.291-0.208-0.88-1.161-1.744-2.323-2.609-3.495l-2.557-3.453-3.203-4.745c-1.068-1.588-2.14-3.172-3.229-4.744-0.011 0-0.025 2.109-0.031 4.681-0.011 4.505-0.011 4.688-0.068 4.792-0.057 0.125-0.151 0.229-0.276 0.287-0.099 0.047-0.188 0.057-0.661 0.057h-0.541l-0.141-0.088c-0.088-0.057-0.161-0.136-0.208-0.229l-0.068-0.141 0.005-6.271 0.011-6.271 0.099-0.125c0.063-0.077 0.141-0.14 0.229-0.187 0.131-0.063 0.183-0.073 0.724-0.073 0.635 0 0.74 0.025 0.907 0.208 1.296 1.932 2.588 3.869 3.859 5.812 2.079 3.152 4.917 7.453 6.312 9.563l2.537 3.839 0.125-0.083c1.219-0.813 2.328-1.781 3.285-2.885 2.016-2.308 3.324-5.147 3.767-8.177 0.129-0.88 0.145-1.141 0.145-2.333 0-1.193-0.016-1.448-0.145-2.328-0.871-6.011-5.147-11.057-10.943-12.928-1.084-0.343-2.199-0.577-3.328-0.697-0.303-0.031-2.371-0.068-2.631-0.041zM21.5 9.688c0.151 0.072 0.265 0.208 0.317 0.364 0.027 0.084 0.032 1.823 0.027 5.74l-0.011 5.624-0.989-1.52-0.995-1.521v-4.083c0-2.647 0.011-4.131 0.025-4.204 0.047-0.167 0.161-0.307 0.313-0.395 0.124-0.063 0.172-0.068 0.667-0.068 0.463 0 0.541 0.005 0.645 0.063z"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#ffffff"
                                                            d="M23.749 30.005c-0.119 0.063-0.109 0.083 0.005 0.025 0.037-0.015 0.068-0.036 0.095-0.061 0-0.021 0-0.021-0.1 0.036zM23.989 29.875c-0.057 0.047-0.057 0.047 0.011 0.016 0.036-0.021 0.068-0.041 0.068-0.047 0-0.027-0.016-0.021-0.079 0.031zM24.145 29.781c-0.057 0.047-0.057 0.047 0.011 0.016 0.037-0.021 0.068-0.043 0.068-0.048 0-0.025-0.016-0.020-0.079 0.032zM24.303 29.688c-0.057 0.047-0.057 0.047 0.009 0.015 0.037-0.020 0.068-0.041 0.068-0.047 0-0.025-0.016-0.020-0.077 0.032zM24.516 29.547c-0.109 0.073-0.147 0.12-0.047 0.068 0.067-0.041 0.181-0.131 0.161-0.131-0.043 0.016-0.079 0.043-0.115 0.063zM14.953 0.011c-0.073 0.005-0.292 0.025-0.484 0.041-4.548 0.412-8.803 2.86-11.5 6.631-1.491 2.067-2.459 4.468-2.824 6.989-0.129 0.88-0.145 1.14-0.145 2.333 0 1.192 0.016 1.448 0.145 2.328 0.871 6.011 5.147 11.057 10.943 12.927 1.043 0.333 2.136 0.563 3.381 0.704 0.484 0.052 2.577 0.052 3.061 0 2.152-0.24 3.969-0.771 5.767-1.688 0.276-0.14 0.328-0.177 0.291-0.208-0.88-1.161-1.744-2.323-2.609-3.495l-2.557-3.453-3.203-4.745c-1.068-1.588-2.14-3.172-3.229-4.744-0.011 0-0.025 2.109-0.031 4.681-0.011 4.505-0.011 4.688-0.068 4.792-0.057 0.125-0.151 0.229-0.276 0.287-0.099 0.047-0.188 0.057-0.661 0.057h-0.541l-0.141-0.088c-0.088-0.057-0.161-0.136-0.208-0.229l-0.068-0.141 0.005-6.271 0.011-6.271 0.099-0.125c0.063-0.077 0.141-0.14 0.229-0.187 0.131-0.063 0.183-0.073 0.724-0.073 0.635 0 0.74 0.025 0.907 0.208 1.296 1.932 2.588 3.869 3.859 5.812 2.079 3.152 4.917 7.453 6.312 9.563l2.537 3.839 0.125-0.083c1.219-0.813 2.328-1.781 3.285-2.885 2.016-2.308 3.324-5.147 3.767-8.177 0.129-0.88 0.145-1.141 0.145-2.333 0-1.193-0.016-1.448-0.145-2.328-0.871-6.011-5.147-11.057-10.943-12.928-1.084-0.343-2.199-0.577-3.328-0.697-0.303-0.031-2.371-0.068-2.631-0.041zM21.5 9.688c0.151 0.072 0.265 0.208 0.317 0.364 0.027 0.084 0.032 1.823 0.027 5.74l-0.011 5.624-0.989-1.52-0.995-1.521v-4.083c0-2.647 0.011-4.131 0.025-4.204 0.047-0.167 0.161-0.307 0.313-0.395 0.124-0.063 0.172-0.068 0.667-0.068 0.463 0 0.541 0.005 0.645 0.063z"
                                                        />
                                                    </svg>
                                                </div>



                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Next.js</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">App Router</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* Tailwind CSS */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY / DULL (default) */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#6b7280"   // dull grey
                                                            d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z"
                                                        />
                                                    </svg>

                                                    {/* FULL COLOR (hover) */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#44A8B3"   // Tailwind brand color
                                                            d="M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Tailwind CSS</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Design Systems</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* Framer Motion */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M19,2H6.75A1,1,0,0,0,6,3.66L9.8,8H5A1,1,0,0,0,4,9v6a1,1,0,0,0,.29.71l6,6A1,1,0,0,0,11,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,21V16h5.25A1,1,0,0,0,18,14.34L14.2,10H19a1,1,0,0,0,1-1V3A1,1,0,0,0,19,2Z"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#ffffff"
                                                            d="M19,2H6.75A1,1,0,0,0,6,3.66L9.8,8H5A1,1,0,0,0,4,9v6a1,1,0,0,0,.29.71l6,6A1,1,0,0,0,11,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,12,21V16h5.25A1,1,0,0,0,18,14.34L14.2,10H19a1,1,0,0,0,1-1V3A1,1,0,0,0,19,2Z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Framer Motion</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Complex Animations</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                </div>
                            </div>
                            <div className="backend">
                                <div className="header flex flex-col">
                                    <div className='flex flex-row gap-2 items-center justify-start'>
                                        <p className='text-xs text-amber-500 font-inter'>02</p>
                                        <h1 className='lg:text-3xl text-2xl font-light font-space text-white'>Backend & Data</h1>
                                    </div>
                                    <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full mb-5'></div>
                                </div>
                                <div className='grid grid-cols-2 grid-rows-4 lg:gap-5 gap-2'>
                                    {/* Node JS */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="-16.5 0 289 289"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M127.999999,288.463771 C124.024844,288.463771 120.314699,287.403728 116.869564,285.548656 L81.6231884,264.612838 C76.32298,261.697724 78.9730854,260.637682 80.5631458,260.107661 C87.7184259,257.72257 89.0434775,257.192547 96.4637688,252.952381 C97.2587979,252.422361 98.3188405,252.687372 99.1138718,253.217392 L126.144927,269.383024 C127.20497,269.913045 128.530021,269.913045 129.325053,269.383024 L235.064182,208.165634 C236.124225,207.635611 236.654245,206.575571 236.654245,205.250519 L236.654245,83.0807467 C236.654245,81.7556929 236.124225,80.6956526 235.064182,80.1656324 L129.325053,19.2132506 C128.26501,18.6832305 126.939959,18.6832305 126.144927,19.2132506 L20.4057954,80.1656324 C19.3457551,80.6956526 18.8157349,82.0207041 18.8157349,83.0807467 L18.8157349,205.250519 C18.8157349,206.31056 19.3457551,207.635611 20.4057954,208.165634 L49.2919247,224.861286 C64.9275364,232.811595 74.7329196,223.536234 74.7329196,214.260871 L74.7329196,93.681159 C74.7329196,92.0910985 76.0579711,90.5010358 77.9130428,90.5010358 L91.4285716,90.5010358 C93.0186343,90.5010358 94.6086948,91.8260873 94.6086948,93.681159 L94.6086948,214.260871 C94.6086948,235.196689 83.2132512,247.387164 63.3374737,247.387164 C57.2422362,247.387164 52.4720502,247.387164 38.9565214,240.761906 L11.1304347,224.861286 C4.24016581,220.886129 5.68434189e-14,213.46584 5.68434189e-14,205.515528 L5.68434189e-14,83.3457557 C5.68434189e-14,75.3954465 4.24016581,67.9751552 11.1304347,64.0000006 L116.869564,2.78260752 C123.494824,-0.927535841 132.505176,-0.927535841 139.130436,2.78260752 L244.869565,64.0000006 C251.759834,67.9751552 256,75.3954465 256,83.3457557 L256,205.515528 C256,213.46584 251.759834,220.886129 244.869565,224.861286 L139.130436,286.078676 C135.685299,287.668739 131.710145,288.463771 127.999999,288.463771 Z M160.596274,204.455488 C114.219461,204.455488 104.679089,183.254659 104.679089,165.233955 C104.679089,163.643893 106.004141,162.053832 107.859212,162.053832 L121.639752,162.053832 C123.229813,162.053832 124.554864,163.113872 124.554864,164.703935 C126.674947,178.749484 132.770187,185.639753 160.861283,185.639753 C183.122154,185.639753 192.662526,180.604556 192.662526,168.67909 C192.662526,161.788821 190.012423,156.753624 155.296065,153.308489 C126.409938,150.393375 108.389235,144.033126 108.389235,120.977226 C108.389235,99.5113875 126.409938,86.7908901 156.621119,86.7908901 C190.542443,86.7908901 207.238095,98.4513472 209.358178,123.89234 C209.358178,124.687371 209.093167,125.482403 208.563147,126.277434 C208.033127,126.807454 207.238095,127.337474 206.443064,127.337474 L192.662526,127.337474 C191.337475,127.337474 190.012423,126.277434 189.747412,124.952382 C186.567289,110.376813 178.351966,105.606625 156.621119,105.606625 C132.240165,105.606625 129.325053,114.086957 129.325053,120.447205 C129.325053,128.132506 132.770187,130.5176 165.631471,134.757766 C198.227744,138.997931 213.598344,145.093169 213.598344,167.884058 C213.333333,191.20497 194.252589,204.455488 160.596274,204.455488 Z"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="-16.5 0 289 289"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        preserveAspectRatio="xMidYMid"
                                                    >
                                                        <path
                                                            fill="#539E43"
                                                            d="M127.999999,288.463771 C124.024844,288.463771 120.314699,287.403728 116.869564,285.548656 L81.6231884,264.612838 C76.32298,261.697724 78.9730854,260.637682 80.5631458,260.107661 C87.7184259,257.72257 89.0434775,257.192547 96.4637688,252.952381 C97.2587979,252.422361 98.3188405,252.687372 99.1138718,253.217392 L126.144927,269.383024 C127.20497,269.913045 128.530021,269.913045 129.325053,269.383024 L235.064182,208.165634 C236.124225,207.635611 236.654245,206.575571 236.654245,205.250519 L236.654245,83.0807467 C236.654245,81.7556929 236.124225,80.6956526 235.064182,80.1656324 L129.325053,19.2132506 C128.26501,18.6832305 126.939959,18.6832305 126.144927,19.2132506 L20.4057954,80.1656324 C19.3457551,80.6956526 18.8157349,82.0207041 18.8157349,83.0807467 L18.8157349,205.250519 C18.8157349,206.31056 19.3457551,207.635611 20.4057954,208.165634 L49.2919247,224.861286 C64.9275364,232.811595 74.7329196,223.536234 74.7329196,214.260871 L74.7329196,93.681159 C74.7329196,92.0910985 76.0579711,90.5010358 77.9130428,90.5010358 L91.4285716,90.5010358 C93.0186343,90.5010358 94.6086948,91.8260873 94.6086948,93.681159 L94.6086948,214.260871 C94.6086948,235.196689 83.2132512,247.387164 63.3374737,247.387164 C57.2422362,247.387164 52.4720502,247.387164 38.9565214,240.761906 L11.1304347,224.861286 C4.24016581,220.886129 5.68434189e-14,213.46584 5.68434189e-14,205.515528 L5.68434189e-14,83.3457557 C5.68434189e-14,75.3954465 4.24016581,67.9751552 11.1304347,64.0000006 L116.869564,2.78260752 C123.494824,-0.927535841 132.505176,-0.927535841 139.130436,2.78260752 L244.869565,64.0000006 C251.759834,67.9751552 256,75.3954465 256,83.3457557 L256,205.515528 C256,213.46584 251.759834,220.886129 244.869565,224.861286 L139.130436,286.078676 C135.685299,287.668739 131.710145,288.463771 127.999999,288.463771 Z M160.596274,204.455488 C114.219461,204.455488 104.679089,183.254659 104.679089,165.233955 C104.679089,163.643893 106.004141,162.053832 107.859212,162.053832 L121.639752,162.053832 C123.229813,162.053832 124.554864,163.113872 124.554864,164.703935 C126.674947,178.749484 132.770187,185.639753 160.861283,185.639753 C183.122154,185.639753 192.662526,180.604556 192.662526,168.67909 C192.662526,161.788821 190.012423,156.753624 155.296065,153.308489 C126.409938,150.393375 108.389235,144.033126 108.389235,120.977226 C108.389235,99.5113875 126.409938,86.7908901 156.621119,86.7908901 C190.542443,86.7908901 207.238095,98.4513472 209.358178,123.89234 C209.358178,124.687371 209.093167,125.482403 208.563147,126.277434 C208.033127,126.807454 207.238095,127.337474 206.443064,127.337474 L192.662526,127.337474 C191.337475,127.337474 190.012423,126.277434 189.747412,124.952382 C186.567289,110.376813 178.351966,105.606625 156.621119,105.606625 C132.240165,105.606625 129.325053,114.086957 129.325053,120.447205 C129.325053,128.132506 132.770187,130.5176 165.631471,134.757766 C198.227744,138.997931 213.598344,145.093169 213.598344,167.884058 C213.333333,191.20497 194.252589,204.455488 160.596274,204.455488 Z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Node.js</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Runtime</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* Express JS */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        role="img"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        role="img"
                                                    >
                                                        <path
                                                            fill="#ffffff"
                                                            d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Express.js</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">API Development</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* Python */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#6b7280"
                                                            d="M15.885,2.1c-7.1,0-6.651,3.07-6.651,3.07V8.36h6.752v1H6.545S2,8.8,2,16.005s4.013,6.912,4.013,6.912H8.33V19.556s-.13-4.013,3.9-4.013h6.762s3.772.06,3.772-3.652V5.8s.572-3.712-6.842-3.712ZM12.153,4.237a1.214,1.214,0,1,1-1.183,1.244v-.02a1.214,1.214,0,0,1,1.214-1.214Z"
                                                        />
                                                        <path
                                                            fill="#9ca3af"
                                                            d="M16.085,29.91c7.1,0,6.651-3.08,6.651-3.08V23.65H15.985v-1h9.47S30,23.158,30,15.995s-4.013-6.912-4.013-6.912H23.64V12.4s.13,4.013-3.9,4.013H12.975S9.2,16.356,9.2,20.068V26.2s-.572,3.712,6.842,3.712Zm3.732-2.147A1.214,1.214,0,1,1,21,26.519v.03a1.214,1.214,0,0,1-1.214,1.214Z"
                                                        />
                                                    </svg>

                                                    {/* COLOR*/}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <defs>
                                                            <linearGradient id="py-a" x1="-133.268" y1="-202.91" x2="-133.198" y2="-202.84"
                                                                gradientTransform="translate(25243.061 38519.17) scale(189.38 189.81)"
                                                                gradientUnits="userSpaceOnUse">
                                                                <stop offset="0" stopColor="#387eb8" />
                                                                <stop offset="1" stopColor="#366994" />
                                                            </linearGradient>

                                                            <linearGradient id="py-b" x1="-133.575" y1="-203.203" x2="-133.495" y2="-203.133"
                                                                gradientTransform="translate(25309.061 38583.42) scale(189.38 189.81)"
                                                                gradientUnits="userSpaceOnUse">
                                                                <stop offset="0" stopColor="#ffe052" />
                                                                <stop offset="1" stopColor="#ffc331" />
                                                            </linearGradient>
                                                        </defs>

                                                        <path
                                                            fill="url(#py-a)"
                                                            d="M15.885,2.1c-7.1,0-6.651,3.07-6.651,3.07V8.36h6.752v1H6.545S2,8.8,2,16.005s4.013,6.912,4.013,6.912H8.33V19.556s-.13-4.013,3.9-4.013h6.762s3.772.06,3.772-3.652V5.8s.572-3.712-6.842-3.712ZM12.153,4.237a1.214,1.214,0,1,1-1.183,1.244v-.02a1.214,1.214,0,0,1,1.214-1.214Z"
                                                        />

                                                        <path
                                                            fill="url(#py-b)"
                                                            d="M16.085,29.91c7.1,0,6.651-3.08,6.651-3.08V23.65H15.985v-1h9.47S30,23.158,30,15.995s-4.013-6.912-4.013-6.912H23.64V12.4s.13,4.013-3.9,4.013H12.975S9.2,16.356,9.2,20.068V26.2s-.572,3.712,6.842,3.712Zm3.732-2.147A1.214,1.214,0,1,1,21,26.519v.03a1.214,1.214,0,0,1-1.214,1.214Z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>Python</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Scripting & AI</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>

                                    {/* MongoDB */}
                                    <div className='group '>
                                        <div className='flex flex-row items-center justify-between'>
                                            <div className='flex flex-row gap-4 items-center justify-start'>
                                                <div className="group relative w-6 h-6">
                                                    {/* GREY */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill="#9ca3af"
                                                            d="M16.62,30l-.751-.249s.1-3.8-1.275-4.067c-.9-1.048.133-44.741,3.423-.149a2.712,2.712,0,0,0-1.333,1.523A14.1,14.1,0,0,0,16.62,30Z"
                                                        />
                                                        <path
                                                            fill="#6b7280"
                                                            d="M17.026,26.329a13.223,13.223,0,0,0,5-13.225C20.556,6.619,17.075,4.487,16.7,3.673a9.792,9.792,0,0,1-.825-1.6l.277,18.069S15.578,25.664,17.026,26.329Z"
                                                        />
                                                        <path
                                                            fill="#4b5563"
                                                            d="M15.487,26.569S9.366,22.4,9.72,15.025A15.54,15.54,0,0,1,15.239,3.377,1.725,1.725,0,0,0,15.846,2c.381.82.319,12.243.359,13.579C16.36,20.776,15.916,25.588,15.487,26.569Z"
                                                        />
                                                    </svg>

                                                    {/* COLOR */}
                                                    <svg
                                                        viewBox="0 0 32 32"
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="mongo-a"
                                                                x1="-645.732"
                                                                y1="839.188"
                                                                x2="-654.59"
                                                                y2="839.25"
                                                                gradientTransform="matrix(-0.977,-0.323,-0.29,0.877,-375.944,-928.287)"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop offset="0.231" stopColor="#999875" />
                                                                <stop offset="0.563" stopColor="#9b9977" />
                                                                <stop offset="0.683" stopColor="#a09f7e" />
                                                                <stop offset="0.768" stopColor="#a9a889" />
                                                                <stop offset="0.837" stopColor="#b7b69a" />
                                                                <stop offset="0.896" stopColor="#c9c7b0" />
                                                                <stop offset="0.948" stopColor="#deddcb" />
                                                                <stop offset="0.994" stopColor="#f8f6eb" />
                                                                <stop offset="1" stopColor="#fbf9ef" />
                                                            </linearGradient>

                                                            <linearGradient
                                                                id="mongo-b"
                                                                x1="-644.287"
                                                                y1="823.405"
                                                                x2="-657.028"
                                                                y2="845.476"
                                                                gradientTransform="matrix(-0.977,-0.323,-0.29,0.877,-375.944,-928.287)"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop offset="0" stopColor="#48a547" />
                                                                <stop offset="1" stopColor="#3f9143" />
                                                            </linearGradient>

                                                            <linearGradient
                                                                id="mongo-c"
                                                                x1="-643.386"
                                                                y1="839.485"
                                                                x2="-652.418"
                                                                y2="833.417"
                                                                gradientTransform="matrix(-0.977,-0.323,-0.29,0.877,-375.944,-928.287)"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop offset="0" stopColor="#41a247" />
                                                                <stop offset="0.352" stopColor="#4ba74b" />
                                                                <stop offset="0.956" stopColor="#67b554" />
                                                                <stop offset="1" stopColor="#69b655" />
                                                            </linearGradient>
                                                        </defs>

                                                        <path
                                                            fill="url(#mongo-a)"
                                                            d="M16.62,30l-.751-.249s.1-3.8-1.275-4.067c-.9-1.048.133-44.741,3.423-.149a2.712,2.712,0,0,0-1.333,1.523A14.1,14.1,0,0,0,16.62,30Z"
                                                        />
                                                        <path
                                                            fill="url(#mongo-b)"
                                                            d="M17.026,26.329a13.223,13.223,0,0,0,5-13.225C20.556,6.619,17.075,4.487,16.7,3.673a9.792,9.792,0,0,1-.825-1.6l.277,18.069S15.578,25.664,17.026,26.329Z"
                                                        />
                                                        <path
                                                            fill="url(#mongo-c)"
                                                            d="M15.487,26.569S9.366,22.4,9.72,15.025A15.54,15.54,0,0,1,15.239,3.377,1.725,1.725,0,0,0,15.846,2c.381.82.319,12.243.359,13.579C16.36,20.776,15.916,25.588,15.487,26.569Z"
                                                        />
                                                    </svg>
                                                </div>


                                                <h2 className='text-neutral-600 font-mono group-hover:text-neutral-400 transition duration-300 ease-in-out'>MongoDB</h2>
                                            </div>
                                            <span className="text-xs font-geist text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block ease-in-out">Document Store</span>
                                        </div>

                                        <div className='h-px bg-neutral-800 rounded-lg mt-2 w-full group-hover:bg-neutral-500 transition duration-300 ease-in-out'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Work */}
                    <div id='work' className='lg:text-8xl text-6xl text-neutral-800 relative top-7 font-inter font-bold h-full z-60 pointer-events-none select-none'>WORK</div>
                    <div className='lg:text-4xl text-2xl font-extralight text-left text-white z-70'>
                        <p style={{ marginLeft: "12px" }} className='z-70 relative'>Projects</p>
                    </div>
                    <div style={{ marginLeft: "10px", marginTop: "6px", height: "1px" }} className='bg-neutral-200 rounded-lg w-12'></div>
                    <div className='flex flex-col gap-24 mt-16'>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
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
                                            {/* Image Showcase Container */}
                                            <div className="relative w-full lg:w-1/2 min-h-55 sm:min-h-70 md:min-h-85 rounded-3xl border border-neutral-900 bg-neutral-950/40 hover:bg-neutral-950/60 overflow-hidden flex items-center justify-center p-6 md:p-12 transition-all duration-500 shadow-2xl shadow-black/50 hover:border-neutral-800 group/img">
                                                {/* Radial glow background on hover */}
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                                
                                                {/* Premium subtle tech grid overlay */}
                                                <div className="absolute inset-0 opacity-[0.02] group-hover/img:opacity-[0.04] transition-opacity duration-500 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[16px_16px]" />
                                                
                                                {/* ID badge */}
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

                                            {/* Text Info Column */}
                                            <div className="w-full lg:w-1/2 flex flex-col space-y-5 justify-center py-4">
                                                {/* Category, Title & Live Status */}
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
                                                        
                                                        {/* Live GitHub Commit Tracking Indicator */}
                                                        {githubData[project.repoName] ? (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-geist text-neutral-500 bg-neutral-950/40 px-2.5 py-0.5 border border-neutral-900 rounded-full select-none">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                                <span>active {timeAgo(githubData[project.repoName].pushed_at)}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-geist text-neutral-600 bg-neutral-950/40 px-2.5 py-0.5 border border-neutral-950 rounded-full select-none">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                                                                <span>tracked on GitHub</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h3 className="text-neutral-100 text-3xl md:text-5xl font-bold tracking-tight font-space group-hover:text-amber-500 transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                </div>

                                                {/* Description with rendered markdown italics */}
                                                <p className="text-neutral-400 text-base md:text-lg font-space leading-relaxed font-light">
                                                    {renderDescription(project.description)}
                                                </p>

                                                {/* Tech badges */}
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

                                                {/* Redirect Buttons */}
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

                        {/* Pagination Controls */}
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



                    {/* Github Info */}
                    <div className='w-full space-y-5 mt-16 mb-26'>
                        <h1 className='text-4xl text-neutral-700 font-geist font-semibold w-fit relative'>Activity <span className='h-px w-1/3 bg-neutral-400 absolute bottom-0 left-0'></span></h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mt-10 w-full">
                                {/* Heatmap Container */}
                                <div className="p-6 md:p-10 bg-neutral-900/40 border border-neutral-800/50 rounded-4xl flex flex-col items-center text-neutral-400">
                                    <GitHubCalendar
                                        username="HimanshuSingh213"
                                        blockSize={12}
                                        blockMargin={5}
                                        fontSize={14}
                                        colorScheme="dark"
                                        theme={{
                                            dark: ['#161b22', '#30363d', '#6e7681', '#abb4bf', '#ffffff'],
                                        }}
                                        renderBlock={(block, activity) => {
                                            const formattedDate = new Date(activity.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                            });

                                            return React.cloneElement(block, {
                                                rx: 10,
                                                ry: 10,
                                                'data-tooltip-id': 'gh-tooltip',
                                                'data-tooltip-content': `${activity.count === 0 ? 'No' : activity.count} contributions on ${formattedDate}`,
                                            });
                                        }}
                                    />

                                    {/* Optimized Tooltip */}
                                    <ReactTooltip
                                        id="gh-tooltip"
                                        className="bg-neutral-950! border! border-neutral-800! text-neutral-200! text-xs! rounded-lg! px-3! py-2! shadow-2xl! opacity-100! z-50!"
                                    />

                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <h3 className='text-xs text-amber-600 border border-amber-600 rounded-xl text-left my-4 w-fit px-2 py-1 font-space tracking-wide'>Say Hello</h3>
                    <ConnectionRedirects />

                    <footer className='mt-8 pt-12 pb-32 border-t border-t-neutral-600'>
                        <div className='text-sm text-neutral-200 text-center font-geist'>Developed by @Himanshu Singh Dangi <br /> @{new Date().getFullYear()}. All Rights Reserved.</div>
                    </footer>

                    {/* Dock */}
                    <div className="fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-neutral-950 via-neutral-950/80 to-transparent z-40 pointer-events-none">
                    </div>
                    <AnimatePresence>
                        {done && <MagneticDock />}
                    </AnimatePresence>
                </div>
            </div >
        </>
    )
}

export default Himanshu