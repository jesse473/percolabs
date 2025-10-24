import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';

interface Market {
    symbol: string;
    name: string;
    binanceSymbol: string;
    price: number;
    change: number;
    volume: string;
    openInterest: string;
    isLoading: boolean;
}

// Initial market data with Binance symbols for API fetching
const INITIAL_MARKETS: Market[] = [
    { symbol: 'BTC-PERP', name: 'Bitcoin', binanceSymbol: 'BTCUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'ETH-PERP', name: 'Ethereum', binanceSymbol: 'ETHUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'SOL-PERP', name: 'Solana', binanceSymbol: 'SOLUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'ARB-PERP', name: 'Arbitrum', binanceSymbol: 'ARBUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'AVAX-PERP', name: 'Avalanche', binanceSymbol: 'AVAXUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'MATIC-PERP', name: 'Polygon', binanceSymbol: 'MATICUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'LINK-PERP', name: 'Chainlink', binanceSymbol: 'LINKUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
    { symbol: 'UNI-PERP', name: 'Uniswap', binanceSymbol: 'UNIUSDT', price: 0, change: 0, volume: '$0', openInterest: '$0', isLoading: true },
];

// Helper function to format volume
const formatVolume = (volume: number): string => {
    if (volume >= 1e9) {
        return `$${(volume / 1e9).toFixed(1)}B`;
    } else if (volume >= 1e6) {
        return `$${(volume / 1e6).toFixed(1)}M`;
    } else if (volume >= 1e3) {
        return `$${(volume / 1e3).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
};

export default function Markets() {
    const [markets, setMarkets] = useState<Market[]>(INITIAL_MARKETS);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch real-time market data from Binance API
    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                // Create a copy of the current markets
                const updatedMarkets = [...markets];
                
                // Fetch data for each market
                const promises = markets.map(async (market, index) => {
                    try {
                        const response = await fetch(
                            `https://api.binance.com/api/v3/ticker/24hr?symbol=${market.binanceSymbol}`
                        );
                        
                        if (!response.ok) {
                            throw new Error(`Failed to fetch data for ${market.binanceSymbol}`);
                        }
                        
                        const data = await response.json();
                        
                        // Calculate volume in USD
                        const volume = parseFloat(data.quoteVolume);
                        
                        // Update the market data
                        updatedMarkets[index] = {
                            ...market,
                            price: parseFloat(data.lastPrice),
                            change: parseFloat(data.priceChangePercent),
                            volume: formatVolume(volume),
                            // Estimate open interest as a percentage of volume
                            openInterest: formatVolume(volume * 0.4),
                            isLoading: false
                        };
                    } catch (error) {
                        console.error(`Error fetching data for ${market.binanceSymbol}:`, error);
                        // Keep existing data but mark as not loading
                        updatedMarkets[index] = {
                            ...market,
                            isLoading: false
                        };
                    }
                });
                
                // Wait for all fetches to complete
                await Promise.all(promises);
                
                // Update state with new data
                setMarkets(updatedMarkets);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching market data:', error);
                setIsLoading(false);
            }
        };

        // Fetch immediately
        fetchMarketData();

        // Update every 10 seconds
        const interval = setInterval(fetchMarketData, 10000);

        return () => clearInterval(interval);
    }, []);

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
                    <h1 className="text-5xl font-black text-gradient-cyber mb-4">Markets</h1>
                    <p className="text-gray-400 text-lg">Trade perpetual futures on your favorite assets</p>
                </motion.div>

                {/* Markets Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--glass-border)]">
                                    <th className="text-left p-6 text-gray-400 font-black uppercase tracking-wide text-sm">Market</th>
                                    <th className="text-right p-6 text-gray-400 font-black uppercase tracking-wide text-sm">Price</th>
                                    <th className="text-right p-6 text-gray-400 font-black uppercase tracking-wide text-sm">24h Change</th>
                                    <th className="text-right p-6 text-gray-400 font-black uppercase tracking-wide text-sm">24h Volume</th>
                                    <th className="text-right p-6 text-gray-400 font-black uppercase tracking-wide text-sm">Open Interest</th>
                                    <th className="text-right p-6 text-gray-400 font-black uppercase tracking-wide text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.map((market, index) => (
                                    <motion.tr
                                        key={market.symbol}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="border-b border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-colors"
                                    >
                                        <td className="p-6">
                                            <div>
                                                <div className="text-white font-black text-lg">{market.symbol}</div>
                                                <div className="text-gray-400 text-sm">{market.name}</div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            {market.isLoading ? (
                                                <div className="animate-pulse bg-[rgb(var(--bg-stellar))] h-6 w-24 ml-auto rounded"></div>
                                            ) : (
                                                <div className="text-white font-black text-lg">${market.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            {market.isLoading ? (
                                                <div className="animate-pulse bg-[rgb(var(--bg-stellar))] h-6 w-16 ml-auto rounded"></div>
                                            ) : (
                                                <div className={`font-black text-lg ${
                                                    market.change >= 0 
                                                        ? 'text-[rgb(var(--profit-green))]' 
                                                        : 'text-[rgb(var(--loss-red))]'
                                                }`}>
                                                    {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            {market.isLoading ? (
                                                <div className="animate-pulse bg-[rgb(var(--bg-stellar))] h-6 w-20 ml-auto rounded"></div>
                                            ) : (
                                                <div className="text-white font-bold">{market.volume}</div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            {market.isLoading ? (
                                                <div className="animate-pulse bg-[rgb(var(--bg-stellar))] h-6 w-20 ml-auto rounded"></div>
                                            ) : (
                                                <div className="text-[rgb(var(--neon-cyan))] font-bold">{market.openInterest}</div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            <a href="/">
                                                <button className="px-6 py-2 bg-gradient-cyber text-white font-black uppercase tracking-wide rounded-xl hover:scale-105 transition-transform">
                                                    Trade
                                                </button>
                                            </a>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

