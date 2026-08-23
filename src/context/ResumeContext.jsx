import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ResumeContext = createContext({
    isResumeOpen: false,
    openResume: () => {},
    closeResume: () => {},
});

export const ResumeProvider = ({ children }) => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const isPushedRef = useRef(false);

    const openResume = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        // Push state to browser history so mobile back button closes modal
        window.history.pushState({ modal: 'resume' }, '', window.location.href);
        isPushedRef.current = true;
        setIsResumeOpen(true);
    };

    const closeResume = () => {
        if (isPushedRef.current) {
            isPushedRef.current = false;
            // Pop the history state if currently on the modal state
            if (window.history.state?.modal === 'resume') {
                window.history.back();
            }
        }
        setIsResumeOpen(false);
    };

    // Handle popstate (mobile hardware back button / swipe back gesture)
    useEffect(() => {
        const handlePopState = () => {
            if (isResumeOpen) {
                isPushedRef.current = false;
                setIsResumeOpen(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isResumeOpen]);

    // Handle Escape key and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isResumeOpen) {
                closeResume();
            }
        };

        if (isResumeOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isResumeOpen]);

    return (
        <ResumeContext.Provider value={{ isResumeOpen, openResume, closeResume }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
export default ResumeContext;
