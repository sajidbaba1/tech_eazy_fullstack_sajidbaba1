import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ANIMATION_DURATION = 200; // milliseconds

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handleMotionPreferenceChange = (e) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleMotionPreferenceChange);

        return () => mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setDarkMode(!darkMode);
            setTimeout(() => setIsTransitioning(false), ANIMATION_DURATION);
        }
    };

    // Performance monitoring
    useEffect(() => {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 100) { // Log slow transitions
                    console.warn('Slow transition detected:', entry);
                }
            });
        });

        observer.observe({ entryTypes: ['longtask'] });
        return () => observer.disconnect();
    }, []);

    return (
        <ThemeContext.Provider value={{
            darkMode,
            toggleTheme,
            isTransitioning,
            reducedMotion,
            ANIMATION_DURATION
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
