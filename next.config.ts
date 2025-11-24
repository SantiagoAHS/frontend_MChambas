import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA({
  dest: "public",           // donde se generará el sw.js
  disable: false,           // forzar que siempre esté activo
  register: true,           // registrar automáticamente el SW
  skipWaiting: true,        // activar SW inmediatamente
  buildExcludes: [/middleware-manifest\.json$/], // evita conflictos en Next 15+
  runtimeCaching: [
    {
      urlPattern: /^\/$/,  // cachea la home
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        networkTimeoutSeconds: 5,
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /\/api\/.*$/,
      handler: "NetworkFirst",
      options: { cacheName: "api-cache" },
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
  ],
  fallbacks: {
    document: "/offline.html", // fallback si ruta no cacheada
  },
})(nextConfig);
