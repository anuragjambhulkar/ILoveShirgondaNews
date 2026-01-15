# Split Deployment Plan (Vercel Backend / Hostasia Frontend)

This plan outlines the steps to deploy the backend (API routes) on Vercel and the frontend (UI) on Hostasia (cPanel), connected with the domain `news.iloveshrigonda.com`.

## User Review Required

> [!IMPORTANT]
> **Static Export Limitations:** Using `output: 'export'` means that some Next.js features like Server-Side Rendering (SSR) and dynamic routes that are not pre-rendered will not work on Hostasia. The frontend will be purely static and fetch data from the Vercel API.

> [!WARNING]
> **CORS Configuration:** We must ensure that the Vercel backend allows requests from `news.iloveshrigonda.com`.

## Proposed Changes

### [Backend Configuration]

#### [MODIFY] [next.config.js](file:///c:/Users/jambh/Desktop/FreeLanceing/TestingNews/next.config.js)
-   Update CORS headers to allow requests from the Hostasia domain.
-   Ensure `output: 'standalone'` is maintained for Vercel, or remove it as Vercel handles this.

### [Frontend Build Script]

#### [NEW] [build-static.js](file:///c:/Users/jambh/Desktop/FreeLanceing/TestingNews/scripts/build-static.js)
-   A helper script to set environment variables and run `next build` with static export configuration.

### [Environment Variables]

#### [MODIFY] [.env](file:///c:/Users/jambh/Desktop/FreeLanceing/TestingNews/.env)
-   Set `NEXT_PUBLIC_BASE_URL` to the future Vercel URL.

---

## Verification Plan

### Automated Tests
-   Verify that `next build` with `output: 'export'` succeeds locally.

### Manual Verification
1.  **Local API Test:** Run the build and check if the static files correctly point to the Vercel API.
2.  **CORS Test:** Once deployed, verify that the frontend can fetch data without CORS errors.
