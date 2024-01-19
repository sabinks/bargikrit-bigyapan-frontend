## Node version
* 18.17.0
* For local development use 3000 port
* npm run dev
* npm run build

## Staging
* run project on 3042 port
* Before push to staging branch, check build success
* command: pm2 start --name bbigyapan_staging_nextjs "npx next start -H 0.0.0.0 -p 3042"

## Live
* run project on 3041 port
* Before push to main branch, check build success
* command: pm2 start --name bbigyapan_nextjs "npx next start -H 0.0.0.0 -p 3041"

## local env values
NEXT_PUBLIC_API_BASE_URL=http://localhost:8091/api
NEXT_PUBLIC_VITE_BACKEND_URL=http://localhost:8091

## live env values
NEXT_PUBLIC_API_BASE_URL=http://sapi.bargikritbigyapan.com/api
NEXT_PUBLIC_VITE_BACKEND_URL=http://sapi.bargikritbigyapan.com

## live env values
NEXT_PUBLIC_API_BASE_URL=http://api.bargikritbigyapan.com/api
NEXT_PUBLIC_VITE_BACKEND_URL=http://api.bargikritbigyapan.com
