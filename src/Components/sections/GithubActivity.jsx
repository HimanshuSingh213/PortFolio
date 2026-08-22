import React from 'react';
import { motion } from "motion/react";
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export function GithubActivity() {
    return (
        <section className='w-full space-y-5 my-16 select-none'>
            <h2 className='text-3xl sm:text-4xl text-neutral-700 font-geist font-semibold w-fit relative'>
                Activity <span className='h-px w-1/3 bg-neutral-400 absolute bottom-0 left-0'></span>
            </h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mt-8 w-full">
                    {/* Heatmap Card Container */}
                    <div className="p-4 sm:p-6 md:p-8 bg-neutral-900/40 border border-neutral-800/50 rounded-3xl sm:rounded-4xl flex flex-col items-center text-neutral-400 shadow-2xl shadow-black/40">
                        {/* Scrollable sheet container for smaller screens */}
                        <div className="w-full overflow-x-auto custom-scrollbar pb-3 pt-1 flex justify-start lg:justify-center">
                            <div className="min-w-fit px-2">
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
                            </div>
                        </div>

                        {/* Optimized Tooltip */}
                        <ReactTooltip
                            id="gh-tooltip"
                            className="bg-neutral-950! border! border-neutral-800! text-neutral-200! text-xs! rounded-lg! px-3! py-2! shadow-2xl! opacity-100! z-50!"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default GithubActivity;
