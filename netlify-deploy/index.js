// Simple placeholder for the SPA
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
        <h1>Percolabs</h1>
        <p>Solana Perpetual Derivatives Exchange</p>
        <p>This is a placeholder page. The actual application requires Node.js v20.19+ to build.</p>
        <p>Please follow the instructions in the NETLIFY_DEPLOYMENT.md file to deploy the application properly.</p>
      </div>
    `;
  }
});