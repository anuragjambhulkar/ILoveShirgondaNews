# cPanel Deployment Guide

## 1. Prerequisites
- Node.js version 18 or higher selected in cPanel
- MongoDB database connection string ready

## 2. Setup Steps

1. **Upload Files**:
   - Upload your project files to the `public_html` or a subdirectory (e.g., `public_html/news`).
   - **Exclude** `node_modules` and `.next` folders (you will install/build on the server).

2. **Node.js Selector**:
   - Go to "Setup Node.js App" in cPanel.
   - Click "Create Application".
   - **Node.js Version**: Select 18.x or higher.
   - **Application Mode**: Production.
   - **Application Root**: The path where you uploaded files (e.g., `public_html/news`).
   - **Application URL**: The URL for your app.
   - **Application Startup File**: `loader.js` (This is important! Do not use `server.js` directly if it fails).

3. **Install Dependencies**:
   - Click "Run NPM Install" in the Node.js app dashboard.
   - Wait for it to complete.

4. **Build the App**:
   - You need to run the build command. You can do this via SSH or by adding a temporary route.
   - **SSH Method (Recommended)**:
     ```bash
     cd /path/to/your/app
     npm run build
     ```
   - **NPM Script Method**:
     - In `package.json`, change `"start": "cross-env NODE_ENV=production node server.js"` to `"start": "npm run build && cross-env NODE_ENV=production node server.js"`.
     - *Note: This will rebuild on every restart, which is slow but works if you don't have SSH.*

5. **Environment Variables**:
   - In the Node.js app dashboard, click "Add Variable".
   - Add all your `.env` variables here:
     - `MONGODB_URI`
     - `DB_NAME`
     - `JWT_SECRET`
     - `NEXT_PUBLIC_BASE_URL`
     - `CORS_ORIGINS`

6. **Restart**:
   - Click "Restart" in the Node.js app dashboard.

## Troubleshooting 503 Errors

- **Check Logs**: Look for `stderr.log` in your application root.
- **Port Issues**: cPanel handles the port automatically. Do NOT hardcode port 3000 in your code if running via Passenger/cPanel. Your `server.js` correctly uses `process.env.PORT`, so this should be fine.
- **Node Version**: Ensure you selected Node 18+. Next.js 14 requires it.
