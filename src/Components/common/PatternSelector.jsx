import React, { useState, useEffect } from 'react';
import { HalftoneSVG } from '../../SVGs/Halftone';
import { CrossesSVG } from '../../SVGs/Crosses';
import { TechSquaresSVG } from '../../SVGs/TechSquares';
import { GrungeSVG } from '../../SVGs/Grunge';
import { PixelGradientSVG } from '../../SVGs/PixelGradient';
import { GridFadeSVG } from '../../SVGs/GridFade';
import { TextSVG } from '../../SVGs/Text';

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

function ProfilePoster({ pattern }) {
    if (pattern === "Dots Grid") return (
        <svg className="w-full h-full text-white opacity-[0.2]"><defs><pattern id="_r_17_" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1" fill="currentColor"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#_r_17_)"></rect></svg>
    );

    if (pattern === "Waves") return (
        <svg className="w-full h-full text-white opacity-[0.2]"><defs><pattern id="_r_17_" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse"><g fill="none" stroke="currentColor" strokeWidth="1"><g><circle cx="12" cy="0" r="12"></circle><circle cx="12" cy="0" r="9.600000000000001"></circle><circle cx="12" cy="0" r="7.199999999999999"></circle><circle cx="12" cy="0" r="4.800000000000001"></circle><circle cx="12" cy="0" r="2.4000000000000004"></circle></g><g><circle cx="0" cy="12" r="12"></circle><circle cx="0" cy="12" r="9.600000000000001"></circle><circle cx="0" cy="12" r="7.199999999999999"></circle><circle cx="0" cy="12" r="4.800000000000001"></circle><circle cx="0" cy="12" r="2.4000000000000004"></circle></g><g><circle cx="24" cy="12" r="12"></circle><circle cx="24" cy="12" r="9.600000000000001"></circle><circle cx="24" cy="12" r="7.199999999999999"></circle><circle cx="24" cy="12" r="4.800000000000001"></circle><circle cx="24" cy="12" r="2.4000000000000004"></circle></g></g></pattern></defs><rect width="100%" height="100%" fill="url(#_r_17_)"></rect></svg>
    );

    if (pattern === "Halftone") return <HalftoneSVG />;
    if (pattern === "Crosses") return <CrossesSVG />;
    if (pattern === "Tech Squares") return <TechSquaresSVG />;
    if (pattern === "Grunge") return <GrungeSVG />;
    if (pattern === "Pixel Gradient") return <PixelGradientSVG />;
    if (pattern === "Grid Fade") return <GridFadeSVG />;
    if (pattern === "Text") return <TextSVG />;

    return null;
}

export function PatternSelector() {
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
                <button
                    onClick={() => handleClick("Dots Grid")}
                    className={`${active === "Dots Grid" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Dots Grid"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="2" cy="2" r="1"></circle><circle cx="6" cy="2" r="1"></circle><circle cx="10" cy="2" r="1"></circle><circle cx="2" cy="6" r="1"></circle><circle cx="6" cy="6" r="1"></circle><circle cx="10" cy="6" r="1"></circle><circle cx="2" cy="10" r="1"></circle><circle cx="6" cy="10" r="1"></circle><circle cx="10" cy="10" r="1"></circle></svg>
                </button>
                <button
                    onClick={() => handleClick("Waves")}
                    className={`${active === "Waves" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Waves"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 6 A 6 6 0 0 1 12 6"></path><path d="M-6 12 A 6 6 0 0 1 6 12"></path><path d="M6 12 A 6 6 0 0 1 18 12"></path></svg>
                </button>
                <button
                    onClick={() => handleClick("Halftone")}
                    className={`${active === "Halftone" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Halftone"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="2" cy="6" r="1.5"></circle><circle cx="6" cy="6" r="1"></circle><circle cx="10" cy="6" r="0.5"></circle></svg>
                </button>
                <button
                    onClick={() => handleClick("Crosses")}
                    className={`${active === "Crosses" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Crosses"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 1v2m0 2v-2m-1 0h2"></path><path d="M6 1v2m0 2v-2m-1 0h2"></path><path d="M10 1v2m0 2v-2m-1 0h2"></path><path d="M2 5v2m0 2v-2m-1 0h2"></path><path d="M6 5v2m0 2v-2m-1 0h2"></path><path d="M10 5v2m0 2v-2m-1 0h2"></path></svg>
                </button>
                <button
                    onClick={() => handleClick("Tech Squares")}
                    className={`${active === "Tech Squares" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Tech Squares"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="2" width="5" height="5"></rect><rect x="6" y="6" width="4" height="4" opacity="0.5"></rect><rect x="1" y="8" width="2" height="2"></rect></svg>
                </button>
                <button
                    onClick={() => handleClick("Grunge")}
                    className={`${active === "Grunge" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Grunge"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 2 L3 4 L2 6 L5 10 L8 8 L11 11" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 1 L7 5 L9 8" opacity="0.5" strokeLinecap="round"></path></svg>
                </button>
                <button
                    onClick={() => handleClick("Pixel Gradient")}
                    className={`${active === "Pixel Gradient" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Pixel Gradient"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="3" height="3" opacity="1"></rect><rect x="4.5" y="0" width="3" height="3" opacity="1"></rect><rect x="9" y="0" width="3" height="3" opacity="0.8"></rect><rect x="0" y="4.5" width="3" height="3" opacity="0.6"></rect><rect x="4.5" y="4.5" width="3" height="3" opacity="0.4"></rect><rect x="9" y="4.5" width="3" height="3" opacity="0.2"></rect><rect x="0" y="9" width="3" height="3" opacity="0.1"></rect><rect x="4.5" y="9" width="3" height="3" opacity="0.05"></rect></svg>
                </button>
                <button
                    onClick={() => handleClick("Grid Fade")}
                    className={`${active === "Grid Fade" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Grid Fade"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 0V12M8 0V12M0 4H12M0 8H12" vectorEffect="non-scaling-stroke"></path></svg>
                </button>
                <button
                    onClick={() => handleClick("Text")}
                    className={`${active === "Text" ? "bg-white text-black" : "text-white/50 hover:bg-white/5 hover:text-white"} p-1.5 rounded-md border transition-all bg-transparent border-transparent cursor-pointer`}
                    title="Text"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><text x="6" y="10" fontSize="10" fontWeight="bold" textAnchor="middle">T</text></svg>
                </button>
            </div>
        </>
    );
}

export default PatternSelector;
