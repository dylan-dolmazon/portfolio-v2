// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Public+Sans": {
            wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
        },
        display: "swap",
        prefetch: true,
        preconnect: true,
        download: true,
        base64: false,
      },
    ],
    "@nuxt/eslint",
    "@nuxt/icon",
    [
      "@nuxt/ui",
      {
        global: true,
        icons: ["heroicons"],
        safelistColors: [
          "blue",
          "gray",
          "red",
          "orange",
          "yellow",
          "green",
          "teal",
          "indigo",
          "purple",
          "pink",
        ],
        typography: {
          font: "sans",
        },
      },
    ],
  ],
  css: ["assets/css/main.css"],
  icon: {
    customCollections: [
      {
        prefix: "icon",
        dir: "./assets/icons",
      },
    ],
  },
});
