import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "motion/react";
import Lenis from '@studio-freight/lenis';

import Preloader from './layout/Preloader';
import MagneticDock from './layout/MagneticDock';
import Footer from './layout/Footer';
import ResumeModal from './common/ResumeModal';
import { ResumeProvider } from '../context/ResumeContext';

import Hero from './sections/Hero';
import About from './sections/About';
import TechStack from './sections/TechStack';
import ProjectsSection from './sections/ProjectsSection';
import Background from './sections/Background';
import GithubActivity from './sections/GithubActivity';
import ContactSection from './sections/ContactSection';

export function Himanshu() {
    const [done, setDone] = useState(false);

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
        });
    }, []);

    useEffect(() => {
        if (!done) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
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

    const handlePreloaderComplete = () => {
        setInterval(() => {
            setDone(true);
        }, 400);
    };

    return (
        <ResumeProvider>
            <div className='bg-neutral-950 flex flex-col items-center himanshu'>
                {/* Preloader */}
                <Preloader done={done} onComplete={handlePreloaderComplete} />

                {/* Main Site Container */}
                <main className='container mx-auto lg:max-w-5xl max-w-screen min-h-screen px-4 lg:p-0 pt-0 lg:pt-0'>
                    <Hero />
                    <About />
                    <TechStack />
                    <ProjectsSection />
                    <Background />
                    <GithubActivity />
                    <ContactSection />
                    <Footer />

                    {/* Dock Bottom Fade Overlay & Magnetic Dock */}
                    <div className="fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-neutral-950 via-neutral-950/80 to-transparent z-40 pointer-events-none" />
                    <AnimatePresence>
                        {done && <MagneticDock />}
                    </AnimatePresence>
                </main>

                {/* In-App Interactive Resume Preview Modal */}
                <ResumeModal />
            </div>
        </ResumeProvider>
    );
}

export default Himanshu;