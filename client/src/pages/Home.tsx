import React from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Header } from '@/components/Header';
import { HeroStats } from '@/components/HeroStats';
import { TradingInterface } from '@/components/TradingInterface';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Header with Wallet Integration */}
      <Header />

      {/* Hero Stats */}
      <HeroStats />

      {/* Main Trading Interface */}
      <TradingInterface />

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-12 border-t border-[var(--glass-border)]">
        <div className="text-center">
          <div className="text-2xl font-black text-gradient-cyber mb-4">PERCOLABS</div>
          <p className="text-gray-400 mb-4">
            Production-ready Solana Perpetual Derivatives Exchange
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="https://x.com/percolabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[rgb(var(--neon-cyan))] transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/aeyakovenko/percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[rgb(var(--neon-cyan))] transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[rgb(var(--neon-cyan))] transition-colors"
            >
              Documentation
            </a>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            © 2025 Percolabs. Forked from{' '}
            <a
              href="https://github.com/aeyakovenko/percolator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--neon-cyan))] hover:underline"
            >
              Percolator Protocol
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

