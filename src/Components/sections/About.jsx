import React from 'react';

export function About() {
    return (
        <div className='w-full space-y-5 my-16'>
            <h1 className='text-4xl text-neutral-700 font-geist font-semibold relative w-fit'>
                About Me
                <span className='h-px w-1/3 bg-neutral-400 absolute bottom-0 left-0'></span>
            </h1>
            <p className='text-lg text-neutral-500'>
                I’m <span className='font-space text-neutral-300'>Himanshu Singh Dangi</span>, a frontend-focused developer who enjoys building clean and{' '}
                <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>
                    simple
                    <span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen">
                        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current">
                            <path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path>
                        </svg>
                    </span>
                </span>{' '}
                web experiences. I like turning ideas into{' '}
                <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>
                    real products
                    <span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen">
                        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current">
                            <path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path>
                        </svg>
                    </span>
                </span>{' '}
                with attention to user interface, motion, and the{' '}
                <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>
                    small details
                    <span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen">
                        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current">
                            <path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path>
                        </svg>
                    </span>
                </span>{' '}
                that make things feel right. I learn by building projects,{' '}
                <span className='relative mx-1 whitespace-nowrap w-full z-30 text-neutral-200 font-space font-medium'>
                    experimenting
                    <span className="absolute -inset-1 z-10 block select-none text-yellow-600 top-0.5 -left-1 bottom-0 -right-1 opacity-70 mix-blend-screen">
                        <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full fill-current">
                            <path d="M195.5,23.3c-28.7-3.4-60.8-2-89.5,4.7c-26.6,6.2-46.6,18.9-38.3,27.3c6.8,6.8,32.6,3.6,58-7.2c28.3-12,56.8-24.9,46.2-31.9C159.2,7.3,124,19.9,90.4,32.2c-49.8,18.2-86.4,19.9-105.7,5C-30,22,17.4,10.9,76.5,8.8c42.1-1.5,89.5,4.4,118.9,14.5"></path>
                        </svg>
                    </span>
                </span>
                , and improving with every iteration.
            </p>
        </div>
    );
}

export default About;
