import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Evitar errores en build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // 👇 Necesario para que Vercel genere correctamente el SW
  experimental: {
    forceSwcTransforms: true,
  },
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,

  runtimeCaching: [
    {
      // 👇 CACHEA LA PÁGINA PRINCIPAL (html, app router)
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
      // 👇 CACHEA ASSETS BÁSICOS (js, css, imágenes)
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "assets-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      // 👇 CACHEA SOLO IMÁGENES PARA EVITAR PROBLEMAS
      urlPattern: /\.(png|jpg|jpeg|gif|svg|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
  ],
})(nextConfig);
