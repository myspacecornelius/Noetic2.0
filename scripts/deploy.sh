#!/usr/bin/env bash
set -euo pipefail

# Deploy Next.js app on Vercel
# Prereqs: npm i -g vercel && vercel login (in this shell) && VERCEℓ account/project accessible

APP_NAME="noetic1"

echo "Linking project (non-interactive if already linked)..."
vercel link --confirm --project "$APP_NAME" || true

echo "Building locally to validate..."
npm run build

echo "Deploying to Vercel (production)..."
vercel --prod --confirm --name "$APP_NAME"

cat <<EONOTE

Next steps:
1) Add the domain to the project:
   vercel domains add david-c-nichols.online

2) Point DNS at Vercel:
   - Apex (root): A 76.76.21.21
   - www: CNAME cname.vercel-dns.com

3) Re-run a production deploy if needed:
   vercel --prod --confirm --name "$APP_NAME"

4) Confirm HTTPS and canonical redirect (www -> apex is configured via vercel.json)

EONOTE

