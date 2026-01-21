const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const { execSync } = require('child_process');

// --- SELF-HEALING: Auto-install dependencies if missing ---
if (!fs.existsSync('./node_modules') || !fs.existsSync('./node_modules/next')) {
  console.log('📦 node_modules missing. Running "npm install --production"...');
  try {
    execSync('npm install --production --no-save --no-audit', { stdio: 'inherit' });
    console.log('✅ Installation complete.');
  } catch (err) {
    console.error('❌ Auto-install failed:', err);
  }
}
// -----------------------------------------------------------

const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : 'production'}`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Closing server gracefully...`);
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
