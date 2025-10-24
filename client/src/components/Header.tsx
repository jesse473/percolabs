import React from 'react';
import { motion } from 'framer-motion';
import { TokenHeader } from './TokenHeader';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50">
            {/* Token Address Banner */}
            <TokenHeader />

            {/* Main Navigation */}
            <nav className="backdrop-blur-2xl bg-[rgb(var(--bg-space))]/80 border-b border-[var(--glass-border)]">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-3 cursor-pointer">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <img src="/percolabstransparent.png" alt="Percolabs" className="w-10 h-10" />
                                <h1 className="text-3xl font-black text-gradient-cyber animate-gradient-shift hover:scale-105 transition-transform">
                                    PERCOLABS
                                </h1>
                            </motion.div>
                        </a>

                        {/* Navigation Links */}
                        <div className="hidden md:flex flex-col items-center gap-3">
                            <div className="flex items-center gap-8">
                                <a
                                    href="/markets"
                                    className="text-white hover:text-[rgb(var(--neon-cyan))] transition-colors font-semibold uppercase tracking-wide"
                                >
                                    Markets
                                </a>
                                <a
                                    href="/portfolio"
                                    className="text-white hover:text-[rgb(var(--neon-cyan))] transition-colors font-semibold uppercase tracking-wide"
                                >
                                    Portfolio
                                </a>
                                <a
                                    href="/analytics"
                                    className="text-white hover:text-[rgb(var(--neon-cyan))] transition-colors font-semibold uppercase tracking-wide"
                                >
                                    Analytics
                                </a>
                                <a
                                    href="https://x.com/percolabs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[rgb(var(--neon-cyan))] transition-colors font-semibold uppercase tracking-wide"
                                >
                                    Twitter
                                </a>
                                <a
                                    href="https://github.com/aeyakovenko/percolator"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[rgb(var(--neon-cyan))] transition-colors font-semibold uppercase tracking-wide"
                                >
                                    GitHub
                                </a>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--bg-stellar))] border border-[var(--glass-border)] rounded-lg">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                    PERCOLABS OFFICIAL CA:
                                </span>
                                <button
                                    onClick={() => {
                                        const address = import.meta.env.VITE_PERCO_TOKEN_ADDRESS || 'CA';
                                        navigator.clipboard.writeText(address);
                                        // Optional: Add toast notification
                                    }}
                                    className="text-xs text-[rgb(var(--neon-cyan))] font-mono font-bold hover:text-[rgb(var(--neon-electric))] transition-colors cursor-pointer"
                                >
                                    {import.meta.env.VITE_PERCO_TOKEN_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE'}
                                </button>
                                <span className="text-xs text-gray-500">📋</span>
                            </div>
                        </div>

                        {/* Wallet Connect */}
                        <div className="flex items-center gap-4">
                            {/* Network Indicator */}
                            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg glass-bg glass-border">
                                <div className="w-2 h-2 rounded-full bg-[rgb(var(--profit-green))] animate-pulse" />
                                <span className="text-xs text-gray-400 font-bold uppercase">Mainnet-Beta</span>
                            </div>

                            {/* Wallet Button with Glow */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-cyber opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                                <WalletMultiButton className="relative" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

