import React from 'react';
import { PatternSelector } from '../common/PatternSelector';
import { TextCarousel } from '../common/TextCarousel';

export function Hero() {
    return (
        <>
            {/* BG - Poster */}
            <div className='md:h-62.5 h-37.5 -mx-4 lg:mx-0 overflow-hidden'>
                <div className='w-full h-full flex justify-start relative group scale-125 md:scale-100 origin-[25%_50%] transition-transform duration-300'>
                    <PatternSelector />
                </div>
            </div>

            {/* Name */}
            <div className='flex w-full relative -top-12.5 gap-1 flex-col lg:flex-row'>
                <img
                    className='size-25 rounded-full'
                    src="https://pbs.twimg.com/profile_images/1956445565006295040/cumepmWE_400x400.jpg"
                    alt="dp"
                />

                <div className='flex flex-col'>
                    <div className='pt-12.5 h-14 w-full'></div>
                    <div className='flex flex-row gap-3 items-center h-12.5'>
                        <div className='flex gap-2 items-center flex-row'>
                            <h1 className='text-neutral-100 font-bold lg:text-3xl text-xl text-nowrap'>
                                Himanshu Singh Dangi
                            </h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="size-4 text-black dark:text-white select-none" aria-label="Verified">
                                <path fill="currentColor" d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"></path>
                            </svg>
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
                    Building <span className='font-geist text-neutral-100 text-sm'>Interactive Web Applications</span> with a focus on <span className='font-geist text-neutral-100 text-sm'>Performance</span> and <span className='font-geist text-neutral-100 text-sm'>Clean Implementation</span>.
                    Working with <span className='font-geist text-neutral-100 text-sm capitalize'>modern frontend</span> tools to create reliable, <span className='font-geist text-neutral-100 text-sm'>Scalable Interfaces</span>.
                </h3>
            </div>
        </>
    );
}

export default Hero;
