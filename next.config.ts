import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,

  runtimeCaching: [
    {
      // ⚡ Cache de páginas y navegación
      urlPattern: ({ request }: { request: Request }) =>
        request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        networkTimeoutSeconds: 3,
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      // ⚡ Cache de assets
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      // ⚡ Cache de API
      urlPattern: /\/api\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 3,
      },
    },

    {
      // ⚡ Imágenes
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],

  // ⚡⚡ Fallback global offline
  fallbacks: {
    document: "/offline.html",
  },
})(nextConfig);
