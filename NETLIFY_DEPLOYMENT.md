# Netlify Deployment Guide for Percolabs

## Option 1: Quick Deployment with Placeholder Page

Since you're experiencing 404 errors with the current deployment, we've created a placeholder page that you can deploy immediately while working on the full application deployment.

### Step 1: Deploy the Placeholder Page

1. Go to [Netlify](https://app.netlify.com/) and log in to your account
2. Click on "Add new site" > "Deploy manually"
3. Drag and drop the `netlify-deploy` folder from your local machine to the Netlify upload area
4. Wait for the upload to complete

This will deploy a simple placeholder page that works correctly with client-side routing.

## Option 2: Full Application Deployment (Requires Node.js v20.19.0+)

### Prerequisites
- Node.js v20.19.0 or higher (current version is v18.17.0)
- pnpm v10.4.1 or higher
- A Netlify account

### Step 1: Upgrade Node.js

You need to upgrade Node.js to v20.19.0 or higher. You can do this using a version manager like nvm:

```bash
# Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use Node.js v20.19.0
nvm install 20.19.0
nvm use 20.19.0
```

### Step 2: Build the Project Locally

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build
```

This will create a `dist` directory with the built application.

### Step 3: Manual Deployment via Netlify Dashboard

1. Go to [Netlify](https://app.netlify.com/) and log in to your account
2. Click on "Add new site" > "Deploy manually"
3. Drag and drop the `dist` folder from your local machine to the Netlify upload area
4. Wait for the upload to complete

### Step 4: Configure Site Settings

1. Once deployed, go to "Site settings" > "Build & deploy" > "Environment variables"
2. Add the following environment variables:
   - `VITE_RPC_ENDPOINT`: https://api.mainnet-beta.solana.com
   - `VITE_ROUTER_PROGRAM_ID`: RoutR1VdCpHqj89WEMJhb6TkGT9cPfr1rVjhM3e2YQr
   - `VITE_SLAB_PROGRAM_ID`: SLabZ6PsDLh2X6HzEoqxFDMqCVcJXDKCNEYuPzUvGPk
   - `VITE_PERCO_TOKEN_ADDRESS`: [Your token address]
   - `VITE_APP_TITLE`: Percolabs
   - `VITE_APP_LOGO`: /percolabstransparent.png

## Fixing 404 Errors

The 404 errors you're experiencing are due to Netlify not properly handling client-side routing for your React application. Here's how to fix it:

### Method 1: Using a _redirects file

Create a file named `_redirects` (no file extension) in your project's public directory with the following content:

```
/* /index.html 200
```

This tells Netlify to redirect all requests to index.html with a 200 status code, which is necessary for client-side routing.

### Method 2: Using netlify.toml

Create a `netlify.toml` file in the root of your project with the following content:

```toml
# Handle SPA routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Both methods accomplish the same thing, but the `netlify.toml` file gives you more configuration options.

## Setting Up Custom Domain

1. Go to "Site settings" > "Domain management"
2. Click on "Add custom domain"
3. Follow the instructions to set up your custom domain

## Troubleshooting

### Missing Environment Variables
If the application is not functioning correctly, check that all environment variables are properly set in the Netlify dashboard.

### Build Failures
If you encounter build failures, make sure you're using Node.js v20.19.0 or higher, as Vite requires this version.