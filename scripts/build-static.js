const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VERCEL_URL = process.argv[2];

if (!VERCEL_URL) {
    console.error('Usage: node scripts/build-static.js <VERCEL_API_URL>');
    console.error('Example: node scripts/build-static.js https://shrigonda-news.vercel.app');
    process.exit(1);
}

const rootDir = process.cwd();
const configPath = path.join(rootDir, 'next.config.js');
const apiDir = path.join(rootDir, 'app', 'api');
const apiBackupDir = path.join(rootDir, 'app', '_api_backup');

console.log(`🚀 Starting Static Build Flow...`);
console.log(`🔗 API URL: ${VERCEL_URL}`);

// 1. Setup Config
console.log('📝 Modifying next.config.js for export...');
let originalConfig = fs.readFileSync(configPath, 'utf8');
let modifiedConfig = originalConfig;

// Ensure output: 'export' is set
if (modifiedConfig.includes("output: 'standalone'")) {
    modifiedConfig = modifiedConfig.replace("output: 'standalone'", "output: 'export'");
} else if (!modifiedConfig.includes("output: 'export'")) {
    // Inject it if not present
    modifiedConfig = modifiedConfig.replace("const nextConfig = {", "const nextConfig = {\n  output: 'export',");
}

fs.writeFileSync(configPath, modifiedConfig);

// 2. Handle API Directory (Next.js export doesn't allow API routes)
let apiMoved = false;
if (fs.existsSync(apiDir)) {
    console.log('📦 Temporarily moving app/api to app/_api_backup...');
    fs.renameSync(apiDir, apiBackupDir);
    apiMoved = true;
}

try {
    // 3. Run Build
    console.log('🏗️ Running: npx next build...');
    // We use npx cross-env to set the API URL for the static build
    execSync(`npx cross-env NEXT_PUBLIC_BASE_URL=${VERCEL_URL} npx next build`, {
        stdio: 'inherit',
        env: { ...process.env, NEXT_PUBLIC_BASE_URL: VERCEL_URL }
    });

    console.log('\n✅ BUILD SUCCESSFUL!');
    console.log('--------------------------------------------------');
    console.log('The static files are ready in the "out" folder.');
    console.log('1. Zip the contents of the "out" folder.');
    console.log('2. Upload to your Hostasia cPanel public_html.');
    console.log('--------------------------------------------------');

} catch (error) {
    console.error('\n❌ BUILD FAILED');
    console.error(error.message);
} finally {
    // 4. Restore everything
    console.log('🔄 Restoring files...');
    fs.writeFileSync(configPath, originalConfig);
    if (apiMoved && fs.existsSync(apiBackupDir)) {
        fs.renameSync(apiBackupDir, apiDir);
    }
    console.log('✨ All files restored.');
}
