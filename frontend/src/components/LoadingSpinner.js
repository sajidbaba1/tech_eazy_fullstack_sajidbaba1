import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ size = 'medium', overlay = false }) => {
    const { darkMode, reducedMotion } = useTheme();

    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    const spinner = (
        <div className={`relative ${sizeClasses[size]}`}>
            <div className={`
                ${reducedMotion ? '' : 'animate-spin'}
                rounded-full
                border-4
                border-gray-200
                dark:border-gray-700
                border-t-blue-500
                dark:border-t-blue-400
                ${sizeClasses[size]}
                transform
                transition-all
                duration-300
            `}></div>
            <div className={`
                absolute
                inset-0
                ${reducedMotion ? '' : 'animate-pulse-slow'}
                rounded-full
                border-4
                border-transparent
                ${darkMode ? 'border-t-blue-400/20' : 'border-t-blue-500/20'}
                ${sizeClasses[size]}
            `}></div>
        </div>
    );

    if (overlay) {
        return (
            <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className={`
                    bg-white
                    dark:bg-gray-800
                    rounded-lg
                    p-6
                    shadow-xl
                    transform
                    ${reducedMotion ? '' : 'animate-bounce-slow'}
                    transition-all
                    duration-300
                `}>
                    {spinner}
                </div>
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
