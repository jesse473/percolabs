---
description: Repository Information Overview
alwaysApply: true
---

# Percolabs Information

## Summary
Percolabs is a production-ready Solana Perpetual Derivatives Exchange built on the Percolator Protocol. It provides a high-performance trading platform for perpetual futures with up to 20x leverage, featuring real-time TradingView charts, comprehensive wallet integration, and advanced trading mechanics.

## Structure
- **client/**: Frontend React application with components, pages, and assets
- **server/**: Express.js server for serving the static frontend
- **shared/**: Shared constants and utilities used by both client and server
- **patches/**: Custom patches for dependencies (wouter@3.7.1)

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.6.3
**Build System**: Vite 7.1.7
**Package Manager**: pnpm 10.4.1

## Dependencies
**Main Dependencies**:
- React 18.3.1 with React DOM
- Solana Web3.js 1.95.8 and wallet adapters
- Express 4.21.2 for server
- Radix UI components for UI elements
- Tailwind CSS 4.1.14 for styling
- Framer Motion 12.23.22 for animations
- Wouter 3.3.5 for routing (with custom patch)

**Development Dependencies**:
- Vite 7.1.7 with React plugin
- TypeScript 5.6.3
- ESBuild 0.25.0
- Tailwind CSS tooling
- Vitest 2.1.4 for testing

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

## Deployment
**Netlify Configuration**:
- Build Command: `cd client && pnpm install && pnpm build`
- Publish Directory: `client/dist`
- Redirects: All routes to index.html (SPA routing)

**Vercel Configuration**:
- Build Command: `cd client && pnpm install && pnpm build`
- Output Directory: `client/dist`
- Install Command: `pnpm install`
- Rewrites: All routes to index.html

## Application Structure
**Entry Points**:
- Client: `client/src/main.tsx` -> `App.tsx`
- Server: `server/index.ts` (Express server)

**Frontend Organization**:
- Components: `client/src/components/`
- Pages: `client/src/pages/`
- Hooks: `client/src/hooks/`
- Contexts: `client/src/contexts/`
- Utilities: `client/src/lib/`

## Environment Configuration
Required environment variables:
- `VITE_APP_TITLE`: Application title
- `VITE_APP_LOGO`: Logo URL
- `VITE_RPC_ENDPOINT`: Solana RPC endpoint
- `VITE_PERCO_TOKEN_ADDRESS`: PERCO token address
- `VITE_ROUTER_PROGRAM_ID`: Router program ID
- `VITE_SLAB_PROGRAM_ID`: Slab program ID

## Blockchain Integration
**Network**: Solana Mainnet
**Programs**:
- Router Program: RoutR1VdCpHqj89WEMJhb6TkGT9cPfr1rVjhM3e2YQr
- Slab Program: SLabZ6PsDLh2X6HzEoqxFDMqCVcJXDKCNEYuPzUvGPk

**Wallet Support**:
- Multiple wallets including Phantom, Solflare, Coinbase, Ledger
- Wallet adapter integration for connection management