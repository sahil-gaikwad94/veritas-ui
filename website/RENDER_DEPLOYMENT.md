# 🌐 Vexx UI — Render.com Deployment Guide

Deploy the Vexx website on **Render.com** Free Tier with zero monthly cost.

## Prerequisites

- A [Render.com](https://render.com) account (free)
- A GitHub account
- The vexx repository cloned locally
- Node.js 20+ installed locally (for testing)

---

## Phase 1: Prepare the Repository

### Step 1.1: Navigate to the website directory

```bash
cd /workspace/app/website
```

### Step 1.2: Verify the project structure

Ensure these key files exist:

```
website/
├── package.json          # Node.js dependencies & scripts
├── next.config.mjs       # Next.js configuration
├── render.yaml           # Render infrastructure-as-code (created)
├── Dockerfile            # Optional container config (created)
├── .dockerignore         # Docker exclusions (created)
├── tsconfig.json         # TypeScript config
├── globals.css           # Tailwind v4 + design tokens
├── source.config.ts      # Fumadocs content collections
├── layout.config.tsx     # Site configuration
├── public/               # Static assets (logos, favicon, wasm/)
│   └── wasm/             # vexx-wasm WebAssembly binaries
├── content/docs/         # MDX documentation (37 pages)
└── src/
    ├── app/              # Next.js App Router routes
    ├── components/       # React components
    ├── lib/              # Utilities & configurations
    └── workers/          # Web Worker for vexx-wasm
```

### Step 1.3: Verify package.json scripts

Your `package.json` should include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "render:build": "npm install && npm run build",
    "render:start": "npm start"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Step 1.4: Verify next.config.mjs

Your `next.config.mjs` should have `output: 'standalone'` for optimal Render deployment:

```js
const config = {
  reactStrictMode: true,
  output: 'standalone',  // Important for Render
  // ...
};
```

### Step 1.5: Commit all changes

```bash
git add .
git commit -m "feat: add vexx-ui website with Render deployment config"
git push origin main
```

---

## Phase 2: Deploy on Render

### Step 2.1: Log in to Render

1. Go to [https://render.com](https://render.com)
2. Sign in with your GitHub account
3. Authorize Render to access your repositories

### Step 2.2: Create a New Web Service

1. Click **"New +"** → **"Web Service"**
2. Select **"Deploy an existing repo from a Git repository"**
3. Choose the `sahil-gaikwad94/veritas` repository
4. Click **"Connect"**

### Step 2.3: Configure the Service

Render will detect the `render.yaml` file automatically. If it doesn't, configure manually:

| Setting | Value |
|---------|-------|
| **Name** | `vexx-website` |
| **Environment** | `Node` |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `website` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Auto-Deploy** | `Yes` (enabled) |

### Step 2.4: Configure Environment Variables

In the Render dashboard, go to your service → **Environment** → **Environment Variables**, and add:

| Key | Value | Required |
|-----|-------|----------|
| `NODE_VERSION` | `20` | Yes |
| `VEXX_NO_NATIVE` | `0` | No (default: 0) |
| `NEXT_TELEMETRY_DISABLED` | `1` | No (recommended) |

### Step 2.5: Create the Service

1. Click **"Create Web Service"**
2. Render will start building your site
3. Wait for the build to complete (typically 2-5 minutes)

### Step 2.6: Verify Deployment

1. Once deployed, Render will give you a URL like `https://vexx-website.onrender.com`
2. Visit the URL and verify:
   - Landing page loads correctly
   - Hero toggle works
   - Documentation pages render
   - `/playground` route loads
   - `/verify` route loads

---

## Phase 3: Alternative — Docker Deployment on Render

If you prefer container deployment:

### Step 3.1: Connect Repository

Same as Phase 2, but select **"Docker"** as the environment instead of "Node".

### Step 3.2: Render will use your `Dockerfile`

The `Dockerfile` at `website/Dockerfile` will be used automatically.

### Step 3.3: Configure

| Setting | Value |
|---------|-------|
| **Name** | `vexx-website` |
| **Environment** | `Docker` |
| **Region** | `Oregon` |
| **Branch** | `main` |
| **Root Directory** | `website` |
| **Auto-Deploy** | `Yes` |

---

## Phase 4: Post-Deployment Configuration

### Step 4.1: Add a Custom Domain (Optional)

1. Go to your Render service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `vexx.dev`)
3. Follow the DNS configuration instructions

### Step 4.2: Enable Auto-Deploy

Auto-deploy is enabled by default. Every push to `main` will trigger a new build and deployment.

### Step 4.3: Monitor Logs

1. Go to your Render service → **Logs**
2. View real-time build and runtime logs
3. Check for any errors

---

## Phase 5: Troubleshooting

### Build Fails: `wasm-pack` not found

The `wasm:build` script requires `wasm-pack` and Rust. On Render, this script is **not** run during `npm run build`. The WASM binaries should be pre-built and committed to `public/wasm/`.

**Solution:** Build WASM locally and commit:

```bash
# Local machine
cd /workspace/app/website
npm run wasm:build
git add public/wasm/
git commit -m "feat: add pre-built vexx-wasm binaries"
git push origin main
```

### Build Fails: Out of Memory

Render's free tier has limited memory (512 MB). If the build fails:

**Solution:** Add `--max-old-space-size=512` to the build command:

```json
"build": "NODE_OPTIONS=--max-old-space-size=512 next build"
```

### Page Not Found (404)

Ensure `output: 'standalone'` is set in `next.config.mjs` and the `rootDir` is set to `website` in Render.

### WASM Not Loading

Ensure `public/wasm/` contains:
- `vexx_wasm_bg.wasm`
- `vexx_wasm.js`

These must be committed to the repository.

---

## Phase 6: CI/CD with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` in the vexx repository:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]
    paths:
      - 'website/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trigger Render Deploy
        run: |
          curl -X POST "${{ secrets.RENDER_HOOK_URL }}"
```

Add `RENDER_HOOK_URL` to your GitHub repository secrets (get it from Render → Service → Settings → Deploy Hook).

---

## Cost Summary

| Resource | Render Free Tier | Cost |
|----------|------------------|------|
| Web Service | 512 MB RAM, 0.1 CPU | $0/month |
| Build Minutes | 500 minutes/month | $0/month |
| Bandwidth | 100 GB/month | $0/month |
| Custom Domains | Supported | $0/month |
| **Total** | | **$0/month** |

---

## Support

- Render Docs: [https://render.com/docs](https://render.com/docs)
- Render Community: [https://community.render.com](https://community.render.com)
- Vexx Repo: [https://github.com/sahil-gaikwad94/veritas](https://github.com/sahil-gaikwad94/veritas)
