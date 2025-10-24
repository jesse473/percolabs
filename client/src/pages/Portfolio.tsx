import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Portfolio() {
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
                    <h1 className="text-5xl font-black text-gradient-cyber mb-4">Portfolio</h1>
                    <p className="text-gray-400 text-lg">Track your positions and trading performance</p>
                </motion.div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Total Balance', value: '$0.00', color: 'text-white' },
                        { label: 'Unrealized PnL', value: '$0.00', color: 'text-[rgb(var(--profit-green))]' },
                        { label: 'Total Margin', value: '$0.00', color: 'text-[rgb(var(--neon-cyan))]' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl"
                        >
                            <div className="text-gray-400 text-sm font-black mb-2 uppercase tracking-wide">{stat.label}</div>
                            <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl backdrop-blur-xl mb-8"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Open Positions</h2>
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-gray-400 text-lg font-bold">No open positions</p>
                        <p className="text-gray-500 text-sm mt-2">Connect your wallet and start trading to see your positions here</p>
                    </div>
                </motion.div>

                {/* Trade History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-8 shadow-2xl backdrop-blur-xl"
                >
                    <h2 className="text-2xl font-black text-white mb-6">Trade History</h2>
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📜</div>
                        <p className="text-gray-400 text-lg font-bold">No trade history</p>
                        <p className="text-gray-500 text-sm mt-2">Your completed trades will appear here</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

