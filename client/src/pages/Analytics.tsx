import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Analytics() {
    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            <Header />
            
            <main className="container mx-auto px-6 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl font-black text-gradient-cyber mb-4">Analytics</h1>
                    <p className="text-gray-400 text-lg">Platform statistics and market insights</p>
                </motion.div>

                {/* Platform Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Volume (24h)', value: '$45.2M', change: '+12.3%', isPositive: true },
                        { label: 'Total Value Locked', value: '$892K', change: '+5.7%', isPositive: true },
                        { label: 'Active Traders', value: '1,234', change: '+89', isPositive: true },
                        { label: 'Total Trades', value: '89.4K', change: '+2.1K', isPositive: true }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl"
                        >
                            <div className="text-gray-400 text-xs font-black mb-3 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-4xl font-black text-gradient-cyber mb-2">{stat.value}</div>
                            <div className={`text-sm font-black ${
                                stat.isPositive ? 'text-[rgb(var(--profit-green))]' : 'text-[rgb(var(--loss-red))]'
                            }`}>
                                {stat.isPositive ? '↗' : '↘'} {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Top Markets */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl backdrop-blur-xl mb-8"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Top Markets by Volume</h2>
                    <div className="space-y-4">
                        {[
                            { symbol: 'BTC-PERP', volume: '$2.4B', percentage: 53 },
                            { symbol: 'ETH-PERP', volume: '$1.2B', percentage: 27 },
                            { symbol: 'SOL-PERP', volume: '$890M', percentage: 20 }
                        ].map((market, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-32 text-white font-black">{market.symbol}</div>
                                <div className="flex-1">
                                    <div className="h-8 bg-[rgb(var(--bg-stellar))] rounded-lg overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${market.percentage}%` }}
                                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                                            className="h-full bg-gradient-cyber"
                                        />
                                    </div>
                                </div>
                                <div className="w-24 text-right text-[rgb(var(--neon-cyan))] font-black">{market.volume}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Trading Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl backdrop-blur-xl"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Trading Activity (7 Days)</h2>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[65, 72, 58, 83, 91, 78, 88].map((height, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                                className="flex-1 bg-gradient-cyber rounded-t-lg relative group"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[rgb(var(--bg-stellar))] px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap">
                                    ${(height * 0.5).toFixed(1)}M
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 font-bold">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

