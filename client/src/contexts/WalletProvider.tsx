import React, { FC, useMemo, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    CoinbaseWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
    TrustWalletAdapter,
    Coin98WalletAdapter,
    MathWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaWalletProviderProps {
    children: ReactNode;
}

export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
    // Network: mainnet-beta for production
    const network = WalletAdapterNetwork.Mainnet;
    
    // RPC endpoint from environment variable
    const endpoint = useMemo(() => {
        return import.meta.env.VITE_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com';
    }, []);

    // Initialize all wallet adapters
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new CoinbaseWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new TrustWalletAdapter(),
            new Coin98WalletAdapter(),
            new MathWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

