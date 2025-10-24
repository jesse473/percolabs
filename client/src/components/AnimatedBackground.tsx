import React from 'react';

export const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--bg-void))] via-[rgb(var(--bg-space))] to-[rgb(var(--bg-nebula))]" />
            
            {/* Animated gradient orbs */}
            <div className="absolute top-0 -left-40 w-96 h-96 bg-[rgb(var(--neon-cyan))]/20 rounded-full blur-[128px] animate-float-slow" />
            <div className="absolute bottom-0 -right-40 w-96 h-96 bg-[rgb(var(--neon-magenta))]/20 rounded-full blur-[128px] animate-float-slower" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgb(var(--neon-purple))]/10 rounded-full blur-[128px] animate-float-slow" />
            
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>
    );
};

