import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Market {
    symbol: string;
    name: string;
    price: number;
    change: number;
    fundingRate: number;
    binanceSymbol: string;
}

const MARKETS: Market[] = [
    { symbol: 'BTC-PERP', name: 'Bitcoin', price: 64234.56, change: 2.34, fundingRate: 0.01, binanceSymbol: 'BTCUSDT' },
    { symbol: 'ETH-PERP', name: 'Ethereum', price: 3456.78, change: 1.89, fundingRate: 0.008, binanceSymbol: 'ETHUSDT' },
    { symbol: 'SOL-PERP', name: 'Solana', price: 145.23, change: 5.67, fundingRate: 0.012, binanceSymbol: 'SOLUSDT' },
    { symbol: 'ARB-PERP', name: 'Arbitrum', price: 1.89, change: -0.45, fundingRate: 0.005, binanceSymbol: 'ARBUSDT' },
    { symbol: 'AVAX-PERP', name: 'Avalanche', price: 42.15, change: 3.21, fundingRate: 0.009, binanceSymbol: 'AVAXUSDT' },
    { symbol: 'MATIC-PERP', name: 'Polygon', price: 0.87, change: 1.12, fundingRate: 0.007, binanceSymbol: 'MATICUSDT' },
];

export const TradingInterface: React.FC = () => {
    const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
    const [realTimePrice, setRealTimePrice] = useState(selectedMarket.price);
    const [priceChange24h, setPriceChange24h] = useState(selectedMarket.change);
    const [orderType, setOrderType] = useState<'long' | 'short'>('long');
    const [orderMode, setOrderMode] = useState<'market' | 'limit'>('market');
    const [leverage, setLeverage] = useState(10);
    const [amount, setAmount] = useState('');
    const [limitPrice, setLimitPrice] = useState(selectedMarket.price.toString());

    // Fetch real-time price from Binance API
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch(
                    `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedMarket.binanceSymbol}`
                );
                const data = await response.json();
                const price = parseFloat(data.lastPrice);
                const change = parseFloat(data.priceChangePercent);
                
                setRealTimePrice(price);
                setPriceChange24h(change);
                
                // Update limit price if in market mode
                if (orderMode === 'market') {
                    setLimitPrice(price.toString());
                }
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        // Fetch immediately
        fetchPrice();

        // Update every 2 seconds
        const interval = setInterval(fetchPrice, 2000);

        return () => clearInterval(interval);
    }, [selectedMarket, orderMode]);

    const handleMarketChange = (symbol: string) => {
        const market = MARKETS.find(m => m.symbol === symbol);
        if (market) {
            setSelectedMarket(market);
            setLimitPrice(market.price.toString());
        }
    };

    const entryPrice = orderMode === 'market' ? realTimePrice : parseFloat(limitPrice) || realTimePrice;

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Proper Grid Layout - No Overlapping */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Chart + Market Info */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Market Selector & Info - REAL-TIME PRICE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl"
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Market Selector */}
                                <Select value={selectedMarket.symbol} onValueChange={handleMarketChange}>
                                    <SelectTrigger className="w-[200px] bg-[rgb(var(--bg-stellar))] border-2 border-[var(--glass-border)] text-white font-black text-lg">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[rgb(var(--bg-nebula))] border-[var(--glass-border)]">
                                        {MARKETS.map(market => (
                                            <SelectItem 
                                                key={market.symbol} 
                                                value={market.symbol}
                                                className="text-white hover:bg-[rgb(var(--bg-stellar))] font-bold cursor-pointer"
                                            >
                                                {market.symbol}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="px-3 py-1 bg-gradient-profit rounded-lg animate-pulse">
                                    <span className="text-white text-xs font-black uppercase">Live</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-white">
                                    ${realTimePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className={`text-xl font-bold ${
                                    priceChange24h >= 0 
                                        ? 'text-[rgb(var(--profit-green))]' 
                                        : 'text-[rgb(var(--loss-red))]'
                                }`}>
                                    {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                                </span>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-gray-400 uppercase tracking-wide font-bold">Funding Rate</div>
                                <div className="text-xl font-black text-gradient-cyber">{selectedMarket.fundingRate}%</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* TradingView Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl"
                    >
                        <div className="w-full h-[500px] bg-[rgb(var(--bg-stellar))] rounded-xl overflow-hidden border border-[var(--glass-border)]">
                            <iframe
                                src={`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=BINANCE%3A${selectedMarket.binanceSymbol}&interval=15&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=0c0f0c&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=percolabs&utm_medium=widget&utm_campaign=chart`}
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen
                            />
                        </div>
                    </motion.div>

                    {/* Market Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                        {[
                            { label: '24h High', value: `$${(realTimePrice * 1.02).toFixed(2)}`, color: 'text-[rgb(var(--profit-green))]' },
                            { label: '24h Low', value: `$${(realTimePrice * 0.98).toFixed(2)}`, color: 'text-[rgb(var(--loss-red))]' },
                            { label: '24h Volume', value: '$2.4B', color: 'text-white' },
                            { label: 'Open Interest', value: '$892M', color: 'text-[rgb(var(--neon-cyan))]' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-bg border border-[var(--glass-border)] rounded-xl p-4">
                                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-bold">{stat.label}</div>
                                <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: Trading Panel */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-bg border-2 border-[var(--glass-border)] rounded-2xl p-6 shadow-xl backdrop-blur-xl sticky top-24"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">⚡</span>
                            <h3 className="text-2xl font-black text-gradient-cyber uppercase tracking-wider">
                                Trading Panel
                            </h3>
                        </div>

                        {/* Market/Limit Toggle */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => setOrderMode('market')}
                                className={`py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all duration-300 ${
                                    orderMode === 'market'
                                        ? 'bg-gradient-cyber text-white shadow-lg scale-105'
                                        : 'bg-[rgb(var(--bg-stellar))] text-gray-400 hover:text-white border border-[var(--glass-border)]'
                                }`}
                            >
                                Market
                            </button>
                            <button
                                onClick={() => setOrderMode('limit')}
                                className={`py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all duration-300 ${
                                    orderMode === 'limit'
                                        ? 'bg-gradient-cyber text-white shadow-lg scale-105'
                                        : 'bg-[rgb(var(--bg-stellar))] text-gray-400 hover:text-white border border-[var(--glass-border)]'
                                }`}
                            >
                                Limit
                            </button>
                        </div>

                        {/* Long/Short Toggle */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => setOrderType('long')}
                                className={`py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all duration-300 ${
                                    orderType === 'long'
                                        ? 'bg-gradient-profit text-white shadow-lg scale-105'
                                        : 'bg-[rgb(var(--bg-stellar))] text-gray-400 hover:text-white border border-[var(--glass-border)]'
                                }`}
                            >
                                📈 Long
                            </button>
                            <button
                                onClick={() => setOrderType('short')}
                                className={`py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all duration-300 ${
                                    orderType === 'short'
                                        ? 'bg-gradient-loss text-white shadow-lg scale-105'
                                        : 'bg-[rgb(var(--bg-stellar))] text-gray-400 hover:text-white border border-[var(--glass-border)]'
                                }`}
                            >
                                📉 Short
                            </button>
                        </div>

                        {/* Limit Price Input (only for limit orders) */}
                        {orderMode === 'limit' && (
                            <div className="mb-6">
                                <Label className="text-white mb-3 block text-sm uppercase tracking-wide font-bold">
                                    Limit Price (USD)
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={limitPrice}
                                        onChange={(e) => setLimitPrice(e.target.value)}
                                        className="bg-[rgb(var(--bg-stellar))] border-2 border-[var(--glass-border)] focus:border-[rgb(var(--neon-cyan))] text-white text-xl font-black py-5 rounded-xl"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                                        USD
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Leverage Slider */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <Label className="text-white text-sm uppercase tracking-wide font-bold">Leverage</Label>
                                <div className="px-4 py-2 bg-gradient-cyber rounded-xl">
                                    <span className="text-white font-black text-xl">{leverage}x</span>
                                </div>
                            </div>
                            <div className="relative h-3 bg-[rgb(var(--bg-stellar))] rounded-full overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-full bg-gradient-cyber transition-all duration-200"
                                    style={{ width: `${(leverage / 20) * 100}%` }}
                                />
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={leverage}
                                    onChange={(e) => setLeverage(Number(e.target.value))}
                                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500 font-bold">
                                <span>1x</span>
                                <span>5x</span>
                                <span>10x</span>
                                <span>15x</span>
                                <span>20x</span>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="mb-6">
                            <Label className="text-white mb-3 block text-sm uppercase tracking-wide font-bold">
                                Amount (SOL)
                            </Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="bg-[rgb(var(--bg-stellar))] border-2 border-[var(--glass-border)] focus:border-[rgb(var(--neon-cyan))] text-white text-2xl font-black py-6 rounded-xl"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                                    SOL
                                </div>
                            </div>
                            <div className="text-sm text-[rgb(var(--neon-cyan))] mt-2 font-bold">
                                ≈ ${amount ? (parseFloat(amount) * entryPrice).toFixed(2) : '0.00'} USD
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-3 mb-6 p-5 bg-[rgb(var(--bg-void))]/70 rounded-xl border border-[var(--glass-border)]">
                            {[
                                { label: 'Order Type', value: orderMode.toUpperCase(), color: 'text-[rgb(var(--neon-cyan))]' },
                                { label: 'Entry Price', value: `$${entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: 'text-white' },
                                { label: 'Liquidation Price', value: orderType === 'long' ? `$${(entryPrice * 0.9).toFixed(2)}` : `$${(entryPrice * 1.1).toFixed(2)}`, color: 'text-[rgb(var(--loss-red))]' },
                                { label: 'Trading Fee', value: '0.05%', color: 'text-gray-400' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400 uppercase tracking-wide font-bold">{item.label}</span>
                                    <span className={`text-lg font-black ${item.color}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Place Order Button */}
                        <Button
                            className={`w-full py-6 text-lg font-black uppercase tracking-wider rounded-xl ${
                                orderType === 'long'
                                    ? 'bg-gradient-profit hover:shadow-2xl'
                                    : 'bg-gradient-loss hover:shadow-2xl'
                            } text-white border-2 border-white/20 transition-all duration-300 hover:scale-105`}
                        >
                            {orderMode === 'market' 
                                ? (orderType === 'long' ? '📈 Open Long Position' : '📉 Open Short Position')
                                : (orderType === 'long' ? '📈 Place Long Limit Order' : '📉 Place Short Limit Order')
                            }
                        </Button>

                        <div className="mt-4 text-center text-xs text-gray-400 font-bold uppercase tracking-wide">
                            Connect wallet to start trading
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

