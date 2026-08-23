/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC_EXPORT liga o export estatico usado no deploy do GitHub Pages.
  // Sem ele o projeto segue como app Next padrao (Vercel, next dev).
  ...(process.env.STATIC_EXPORT === 'true' && { output: 'export' }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true },
}
module.exports = nextConfig
