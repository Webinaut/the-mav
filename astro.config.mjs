import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify";
// import mdx from "@astrojs/mdx";
// import node from "@astrojs/node";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  trailingSlash: "always",
  site: "https://themaverick.net.au",
  integrations: [sitemap()],
  // markdown: {
  //   extendDefaultPlugins: true,
  // },
  site: "https://themaverick.net.au",
  output: "server",
  // Register the custom image-processing block globally
  markdown: {
    remarkPlugins: [remarkFloatedImages],
  },
  server: {
    port: 4321,
    headers: {
      // FIX: Prevents Astro from severing client-side fetch handshakes to api.github.com
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Access-Control-Allow-Origin": "*",
    },
  },
  adapter: netlify(),
});
