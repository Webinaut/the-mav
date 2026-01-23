import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify";
// import node from "@astrojs/node";

export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  trailingSlash: "always",
  site: "https://themaverick.net.au",
  integrations: [sitemap(), preact()],

  markdown: {
    extendDefaultPlugins: true,
  },

  // adapter: netlify(),
  output: "server",
  // adapter: node({
  //   mode: "standalone",
  // }),
  adapter: netlify(),
});
