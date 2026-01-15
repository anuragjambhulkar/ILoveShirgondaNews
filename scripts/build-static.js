const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// This script prepares a static build for Hostasia while pointing to the Vercel API
const VERCEL_URL = process.argv[2];

if (!VERCEL_URL) {
    console.error('Usage: node scripts/build-static.js <VERCEL_API_URL>');
    console.error('Example: node scripts/build-static.js https://shrigonda-news-api.vercel.app');
    process.exit(1);
}

console.log(`🚀 Preparing static build pointing to: ${VERCEL_URL}`);

// 1. Update next.config.js for static export
const configPath = path.join(process.cwd(), 'next.config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Temporarily change output to 'export' if it's 'standalone'
const modifiedConfig = configContent.replace("output: 'standalone'", "output: 'export'");
fs.writeFileSync(configPath, modifiedConfig);

try {
    // 2. Run the build with the environment variable
    console.log('🏗️ Building Next.js app...');
    execSync(`npx cross-env NEXT_PUBLIC_BASE_URL=${VERCEL_URL} next build`, { stdio: 'inherit' });
    console.log('✅ Build successful! Static files are in the "out" directory.');

    // 3. Inform about the next steps
    console.log('\n--- NEXT STEPS ---');
    console.log('1. Zip the contents of the "out" folder.');
    console.log('2. Upload the zip to your Hostasia cPanel (public_html or subdomain folder).');
    console.log('3. Extract the files.');
    console.log('------------------');

} catch (error) {
    console.error('❌ Build failed:', error.message);
} finally {
    // 4. Restore next.config.js
    fs.writeFileSync(configPath, configContent);
    console.log('📝 Restored next.config.js');
}
