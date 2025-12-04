# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Before deploying, ensure you have set up the following environment variables in your production environment:

```bash
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
DB_NAME=shrigonda_news
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application URLs
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Security
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional
PORT=3000
NODE_ENV=production
```

### 2. Security Checklist
- [ ] Change the default JWT_SECRET to a strong, unique value
- [ ] Update CORS_ORIGINS to only include your production domain
- [ ] Ensure MongoDB connection string uses a strong password
- [ ] Review and update the default admin credentials (username: admin, password: admin123)
- [ ] Enable MongoDB IP whitelist for production servers only
- [ ] Set up SSL/TLS certificates for HTTPS

### 3. Build and Test
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the production build locally
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all required environment variables

### Option 2: Docker Deployment

1. Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. Create `.dockerignore`:
```
node_modules
.next
.git
.env
docs
scripts
tests
```

3. Build and run:
```bash
docker build -t shrigonda-news .
docker run -p 3000:3000 --env-file .env shrigonda-news
```

### Option 3: Traditional VPS (Ubuntu/Debian)

1. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2 for process management:
```bash
sudo npm install -g pm2
```

3. Clone and setup:
```bash
git clone <your-repo-url>
cd TestingNews
npm install
npm run build
```

4. Create PM2 ecosystem file (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'shrigonda-news',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

5. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

6. Setup Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment

### 1. Health Checks
- [ ] Verify the application is accessible
- [ ] Test user login functionality
- [ ] Create a test article
- [ ] Verify MongoDB connection
- [ ] Check all API endpoints

### 2. Monitoring
Set up monitoring for:
- Server uptime
- Response times
- Error rates
- Database connection status

### 3. Backups
- Set up automated MongoDB backups
- Keep backups of environment variables
- Document deployment procedures

## Performance Optimization

### 1. Enable Caching
Consider adding Redis for session management and caching.

### 2. CDN Integration
Use a CDN for static assets and images.

### 3. Database Indexing
Ensure MongoDB has proper indexes:
```javascript
// Run these in MongoDB shell
db.news.createIndex({ status: 1, createdAt: -1 })
db.news.createIndex({ category: 1, status: 1 })
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
```

## Troubleshooting

### Build Fails
- Check Node.js version (should be >= 18)
- Clear `.next` folder and rebuild
- Verify all dependencies are installed

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### Performance Issues
- Monitor memory usage
- Check for memory leaks
- Optimize database queries
- Enable Next.js caching

## Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Rate Limiting**: Implement rate limiting on API routes
3. **Input Validation**: All user inputs are validated
4. **HTTPS Only**: Always use HTTPS in production
5. **Security Headers**: Already configured in next.config.js
6. **Database Security**: Use strong passwords and enable authentication

## Support

For issues or questions:
1. Check the logs: `pm2 logs` (if using PM2)
2. Review MongoDB logs
3. Check server logs for errors
