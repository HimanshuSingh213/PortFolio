import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText, Loader2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import siteConfig from '../../config/site';

export function ResumeModal() {
    const { isResumeOpen, closeResume } = useResume();
    const [isLoading, setIsLoading] = useState(true);

    const embedUrl = siteConfig.getResumeEmbedUrl();

    return (
        <AnimatePresence>
            {isResumeOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeResume}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 15 }}
                        transition={{ type: "spring", duration: 0.3, bounce: 0.08 }}
                        className="relative w-full h-[100dvh] sm:h-[88vh] sm:max-h-[850px] sm:max-w-4xl bg-neutral-950 sm:border sm:border-neutral-800 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-101"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-3.5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:py-4 border-b border-neutral-800/90 bg-neutral-900/90 backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                                <div className="size-8 rounded-lg bg-neutral-950 border border-neutral-700/80 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-amber-400" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xs sm:text-base font-space font-medium text-white truncate">
                                        Himanshu Singh Dangi
                                    </h3>
                                    <p className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                                        Curriculum Vitae • Live Preview
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={siteConfig.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 text-xs font-mono font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-colors"
                                    title="Open Original Document in New Tab"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                                    <span className="hidden sm:inline">Open in New Tab</span>
                                    <span className="sm:hidden text-[11px]">Open</span>
                                </a>

                                <button
                                    onClick={closeResume}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800/70 hover:bg-neutral-800 transition-colors"
                                    aria-label="Close resume modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="relative flex-1 min-h-0 bg-neutral-900/40 w-full overflow-hidden">
                            {isLoading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950 text-neutral-500 z-10">
                                    <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                                    <p className="text-xs font-mono">Loading Document Preview...</p>
                                </div>
                            )}

                            <iframe
                                src={embedUrl}
                                title="Himanshu Singh Dangi Resume"
                                className="w-full h-full border-0"
                                onLoad={() => setIsLoading(false)}
                                allow="autoplay"
                            />
                        </div>

                        <div className="flex items-center justify-between px-3.5 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 bg-neutral-950 border-t border-neutral-900 text-[10px] sm:text-[11px] font-mono text-neutral-500 shrink-0">
                            <span className="hidden sm:inline">
                                Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">ESC</kbd> or click outside to close
                            </span>
                            <span className="sm:hidden text-neutral-400">
                                Swipe or press Back to close
                            </span>
                            <a
                                href={siteConfig.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-500 hover:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                            >
                                Direct Link ↗
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default ResumeModal;
