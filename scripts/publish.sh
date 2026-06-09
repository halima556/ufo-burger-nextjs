#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> GitHub (halima556/ufo-burger-nextjs)"
if ! gh auth status &>/dev/null; then
  gh auth login --hostname github.com --git-protocol https --web
fi

git push -u origin main
echo "    https://github.com/halima556/ufo-burger-nextjs"

echo ""
echo "==> Vercel (halima556 account)"
if ! npx vercel whoami &>/dev/null; then
  npx vercel login
fi

rm -rf .vercel
npx vercel link --yes --project ufo-burger-nextjs 2>/dev/null || npx vercel --yes
npx vercel git connect https://github.com/halima556/ufo-burger-nextjs.git 2>/dev/null || true
npx vercel --prod --yes

echo ""
echo "Fertig!"
echo "  GitHub:  https://github.com/halima556/ufo-burger-nextjs"
echo "  Vercel:  https://vercel.com/dashboard"
