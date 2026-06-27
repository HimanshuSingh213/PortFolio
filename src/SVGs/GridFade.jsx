import React from 'react';

export const GridFadeSVG = () => {
    return (
        <svg className="w-full h-full text-white opacity-[0.2]">
            <defs>
                <mask id="_r_17_-mask">
                    <linearGradient id="_r_17_-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity="0"></stop>
                        <stop offset="15%" stopColor="white" stopOpacity="1"></stop>
                        <stop offset="90%" stopColor="white" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
                    </linearGradient>
                    <rect width="100%" height="100%" fill="url(#_r_17_-grad)"></rect>
                </mask>
                <pattern id="_r_17_" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1"></path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#_r_17_)" mask="url(#_r_17_-mask)"></rect>
        </svg>
    );
};