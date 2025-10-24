import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const TokenHeader: React.FC = () => {
    const tokenAddress = import.meta.env.VITE_PERCO_TOKEN_ADDRESS;
    const [copied, setCopied] = useState(false);

    // Don't render if no token address is set
    if (!tokenAddress || tokenAddress === 'YOUR_PERCOLABS_TOKEN_ADDRESS_HERE') {
        return null;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tokenAddress);
        setCopied(true);
        toast.success('PERCO Token Address Copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const openSolscan = () => {
        window.open(`https://solscan.io/token/${tokenAddress}`, '_blank');
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-cyber py-3 px-6"
        >
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                        <span className="text-white font-bold text-sm">🪙 PERCO TOKEN:</span>
                        <code className="text-white/90 text-xs sm:text-sm font-mono bg-black/20 px-3 py-1 rounded-lg">
                            {tokenAddress}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1"
                        >
                            📋 {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={openSolscan}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1"
                        >
                            🔗 Solscan
                        </button>
                    </div>
                    <div className="text-white/80 text-xs sm:text-sm font-medium">
                        Trade PERCO • Add Liquidity • Stake for Rewards
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

