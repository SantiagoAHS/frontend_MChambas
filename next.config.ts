import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA({
  dest: "public",
  // Para pruebas locales, forzamos que no se desactive
  disable: false, 
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^\/$/, // página inicial
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        networkTimeoutSeconds: 3,
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 3,
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
  // ⚠ Este fallback se usa para rutas no visitadas antes de quedarse offline
  fallbacks: {
    document: "/offline.html",
  },
})(nextConfig);
