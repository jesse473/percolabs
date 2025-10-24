import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, isPositive, delay }) => {
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayValue(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay / 1000 }}
            className="relative group"
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-cyber opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            
            {/* Card content */}
            <div className="relative glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-[rgb(var(--neon-cyan))]">
                <div className="text-gray-400 text-xs font-black mb-3 uppercase tracking-widest">{label}</div>
                <div className="font-black text-gradient-cyber mb-2 text-4xl">
                    {displayValue}
                </div>
                <div className={`text-sm font-black flex items-center gap-2 ${
                    isPositive ? 'text-[rgb(var(--profit-green))]' : 'text-[rgb(var(--loss-red))]'
                }`}>
                    <span className="text-xl">{isPositive ? '↗' : '↘'}</span>
                    <span className="uppercase tracking-wide">{change}</span>
                </div>
            </div>
        </motion.div>
    );
};

export const HeroStats: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            {/* Proper 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="24H Volume"
                    value="$45.2M"
                    change="+12.3%"
                    isPositive={true}
                    delay={100}
                />
                <StatCard
                    label="TVL"
                    value="$892K"
                    change="+5.7%"
                    isPositive={true}
                    delay={200}
                />
                <StatCard
                    label="Active Traders"
                    value="1,234"
                    change="+89 today"
                    isPositive={true}
                    delay={300}
                />
                <StatCard
                    label="Total Trades"
                    value="89.4K"
                    change="+2.1K today"
                    isPositive={true}
                    delay={400}
                />
            </div>
        </div>
    );
};

