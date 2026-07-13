import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
// import node from "@astrojs/node";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  trailingSlash: "always",
  site: "https://themaverick.net.au",
  integrations: [sitemap(), mdx()],
  // markdown: {
  //   extendDefaultPlugins: true,
  // },
  site: "https://themaverick.net.au",
  output: "server",
  adapter: netlify(),
});