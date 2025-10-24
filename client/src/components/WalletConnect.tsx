import React, { useCallback, useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { motion } from 'framer-motion';

export const WalletConnect: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number>(0);

    // Fetch SOL balance
    const fetchBalance = useCallback(async () => {
        if (publicKey) {
            try {
                const bal = await connection.getBalance(publicKey);
                setBalance(bal / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }
    }, [publicKey, connection]);

    // Auto-fetch balance on connect and every 5 seconds
    useEffect(() => {
        fetchBalance();
        const interval = setInterval(fetchBalance, 5000);
        return () => clearInterval(interval);
    }, [fetchBalance]);

    // Format address (truncate)
    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (!publicKey) {
        return (
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-cyber opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button */}
                <WalletMultiButton className="relative" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {/* Balance Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-bg glass-border rounded-xl px-4 py-2"
            >
                <div className="flex items-center gap-2">
                    <span className="text-[rgb(var(--neon-cyan))] text-sm font-semibold">💰</span>
                    <span className="text-white font-bold">{balance.toFixed(4)} SOL</span>
                </div>
            </motion.div>

            {/* Connected Wallet */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-cyber opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative glass-bg glass-border rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[rgb(var(--profit-green))] animate-pulse" />
                    <span className="text-white font-semibold">
                        {formatAddress(publicKey.toBase58())}
                    </span>
                </div>
            </div>
        </div>
    );
};

