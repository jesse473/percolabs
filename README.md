# ⚡ PERCOLABS

**Production-ready Solana Perpetual Derivatives Exchange**

[![Twitter Follow](https://img.shields.io/twitter/follow/percolabs?style=social)](https://x.com/percolabs)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-green.svg)](https://solana.com)

---

## 🚀 Overview

**Percolabs** is a cutting-edge perpetual derivatives exchange built on Solana, forked from the [Percolator Protocol](https://github.com/aeyakovenko/percolator). It provides traders with a high-performance, low-latency platform for trading perpetual futures with up to 20x leverage.

The platform features a stunning, futuristic interface with real-time TradingView charts, comprehensive wallet integration, and advanced trading mechanics including portfolio margin, cross-collateral positions, and anti-toxicity mechanisms.

### ✨ Key Features

- **🔥 High-Performance Trading** - Built on Solana for sub-second finality and minimal fees
- **📊 Real-Time Charts** - Integrated TradingView charts with funding rate annotations
- **💼 Multi-Wallet Support** - Phantom, Solflare, Coinbase, Ledger, and 8+ more wallets
- **⚡ Up to 20x Leverage** - Flexible leverage with real-time liquidation price calculations
- **🎨 Stunning UI/UX** - Glassmorphic design with animated gradients and smooth transitions
- **🔐 Secure Trading** - Time-limited capabilities, nonce-based replay protection
- **📈 Portfolio Margin** - Cross-slab margin netting for capital efficiency
- **🌐 Fully On-Chain** - All trades settled on Solana mainnet

---

## 🏗️ Architecture

Percolabs is built on top of the **Percolator Protocol**, which consists of two core programs:

### 1. **Router Program** (`RoutR1VdCpHqj89WEMJhb6TkGT9cPfr1rVjhM3e2YQr`)
Global coordinator for:
- Collateral management across all markets
- Portfolio margin calculations
- Cross-slab routing and position netting

### 2. **Slab Program** (`SLabZ6PsDLh2X6HzEoqxFDMqCVcJXDKCNEYuPzUvGPk`)
LP-run perpetual engines with:
- 10MB state budget per market
- Order book management
- Trade execution and settlement

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **shadcn/ui** - High-quality React components

### Blockchain
- **Solana Web3.js** - Solana blockchain interaction
- **Wallet Adapter** - Universal wallet connection
- **SPL Token** - Token program integration

### Design System
- **Space Grotesk** - Modern, geometric sans-serif font
- **Custom Color Palette** - Unique teal, aqua, purple, and hot pink gradients
- **Glassmorphism** - Frosted glass effects with backdrop blur
- **Deep Space Theme** - Dark purple-black backgrounds with neon accents

---

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and **pnpm** 8+
- **Solana Wallet** (Phantom, Solflare, etc.)
- **RPC Endpoint** (Helius, QuickNode, or public endpoint)

### Clone the Repository
```bash
git clone https://github.com/yourusername/percolabs.git
cd percolabs
```

### Install Dependencies
```bash
pnpm install
```

### Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# Solana RPC Endpoint
VITE_RPC_ENDPOINT=https://api.mainnet-beta.solana.com

# PERCO Token Address (replace with your token)
VITE_PERCO_TOKEN_ADDRESS=YOUR_TOKEN_ADDRESS_HERE

# Percolator Program IDs
VITE_ROUTER_PROGRAM_ID=RoutR1VdCpHqj89WEMJhb6TkGT9cPfr1rVjhM3e2YQr
VITE_SLAB_PROGRAM_ID=SLabZ6PsDLh2X6HzEoqxFDMqCVcJXDKCNEYuPzUvGPk
```

### Run Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

---

## 🎯 Usage

### Connecting Your Wallet

1. Click the **"SELECT WALLET"** button in the top-right corner
2. Choose your preferred wallet from the list
3. Approve the connection request in your wallet
4. Your SOL balance will be displayed automatically

### Opening a Position

1. Select **LONG** or **SHORT** in the Trading Panel
2. Adjust your **leverage** using the slider (1x - 20x)
3. Enter the **amount** in SOL you want to trade
4. Review the **Entry Price**, **Liquidation Price**, and **Trading Fee**
5. Click **"OPEN LONG POSITION"** or **"OPEN SHORT POSITION"**
6. Confirm the transaction in your wallet

### Monitoring Your Positions

- View real-time price updates on the TradingView chart
- Check your **unrealized PnL** in the portfolio section
- Monitor **funding rates** displayed on the chart header
- Track **liquidation prices** to manage risk

---

## 🔧 Configuration

### Supported Wallets

Percolabs supports the following Solana wallets out of the box:

- **Phantom** - Most popular Solana wallet
- **Solflare** - Feature-rich web and mobile wallet
- **Coinbase Wallet** - Multi-chain wallet with Solana support
- **Ledger** - Hardware wallet for maximum security
- **Torus** - Social login wallet
- **Trust Wallet** - Multi-chain mobile wallet
- **Coin98** - Multi-chain wallet with DeFi features
- **MathWallet** - Multi-platform crypto wallet

### RPC Endpoints

For production use, we recommend using a dedicated RPC provider:

- **Helius** - `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`
- **QuickNode** - `https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_KEY/`
- **Triton** - `https://YOUR_ENDPOINT.rpcpool.com/YOUR_KEY`
- **Public** - `https://api.mainnet-beta.solana.com` (rate-limited)

---

## 🎨 Design System

### Color Palette

```css
/* Backgrounds - Deep Space Theme */
--bg-void: rgb(8, 4, 12);        /* Deepest background */
--bg-space: rgb(12, 8, 18);      /* Primary background */
--bg-nebula: rgb(20, 14, 28);    /* Secondary panels */
--bg-stellar: rgb(28, 20, 38);   /* Tertiary cards */

/* Neon Accents - Electric */
--neon-cyan: rgb(0, 255, 200);       /* Primary CTA */
--neon-electric: rgb(100, 255, 220); /* Highlights */
--neon-purple: rgb(180, 100, 255);   /* Tertiary accent */
--neon-magenta: rgb(255, 50, 150);   /* Secondary accent */

/* Semantic Colors */
--profit-green: rgb(0, 230, 118);    /* Gains, long positions */
--loss-red: rgb(255, 60, 100);       /* Losses, short positions */
--warning-amber: rgb(255, 180, 50);  /* Warnings, alerts */
--info-blue: rgb(80, 150, 255);      /* Information */
```

### Typography

- **Font Family**: Space Grotesk
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Letter Spacing**: Increased for uppercase text (0.5px - 1px)

---

## 🔐 Security

### Trading Security

- **Time-Limited Capabilities** - All trading permissions expire after 2 minutes
- **Nonce-Based Replay Protection** - Prevents transaction replay attacks
- **Scoped Permissions** - Capabilities are scoped to specific (user, slab, mint) tuples
- **Auto-Expiry** - Unused capabilities automatically expire

### Smart Contract Audits

The Percolator Protocol has undergone security audits. For more information, visit the [Percolator GitHub repository](https://github.com/aeyakovenko/percolator).

---

## 📚 Trading Mechanics

### Reserve-Commit Model

Percolabs uses a two-phase trading system:

1. **RESERVE PHASE**
   - User submits order intent
   - Protocol walks the order book
   - Locks "slices" of liquidity
   - Calculates VWAP and worst price
   - Returns reservation ID

2. **COMMIT PHASE**
   - User confirms reservation
   - Executes at locked maker prices
   - Updates positions
   - Records trade in ring buffer

3. **CANCEL OPTION**
   - Release reservation if user declines
   - Unlocks slices
   - No execution

### Margin System

```typescript
// LOCAL (Per Slab)
initialMargin: number;      // IM - Required to open
maintenanceMargin: number;  // MM - Liquidation threshold

// GLOBAL (Cross-Slab via Router)
portfolioMargin: number;    // Netted exposure across all slabs
crossMarginBenefit: boolean; // Lower margin due to hedging

// Equity Calculation
equity = collateral + unrealizedPnL + fundingPayments
liquidation_triggered = equity < maintenanceMargin
```

### Anti-Toxicity Mechanisms

- **Kill Band** - Rejects orders if mark price moved too much (e.g., 2% threshold)
- **JIT Penalty** - DLP orders posted after batch_open get no rebate
- **Aggressor Roundtrip Guard** - Taxes roundtrip trades in the same batch

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [https://percolabs.io](https://percolabs.io)
- **Twitter**: [@percolabs](https://x.com/percolabs)
- **GitHub**: [Percolabs](https://github.com/yourusername/percolabs)
- **Percolator Protocol**: [aeyakovenko/percolator](https://github.com/aeyakovenko/percolator)
- **Documentation**: Coming soon

---

## 💬 Community & Support

- **Twitter**: Follow [@percolabs](https://x.com/percolabs) for updates
- **Discord**: Join our community (coming soon)
- **Telegram**: Join our trading group (coming soon)
- **GitHub Issues**: Report bugs or request features

---

## 🙏 Acknowledgments

- **Anatoly Yakovenko** - For creating the Percolator Protocol
- **Solana Foundation** - For building the fastest blockchain
- **TradingView** - For providing excellent charting tools
- **Solana Wallet Adapter Team** - For seamless wallet integration

---

## ⚠️ Disclaimer

**Trading perpetual futures involves substantial risk of loss and is not suitable for all investors.** 

- Leverage amplifies both gains and losses
- You can lose more than your initial investment
- Past performance is not indicative of future results
- Always do your own research (DYOR)
- Never invest more than you can afford to lose

Percolabs is provided "as is" without warranty of any kind. Use at your own risk.

---

<div align="center">

**Built with ⚡ by the Percolabs Team**

© 2025 Percolabs. Forked from [Percolator Protocol](https://github.com/aeyakovenko/percolator)

</div>

