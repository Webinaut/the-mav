import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify/functions";
import preact from "@astrojs/preact";
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
  output: "server",
  adapter: netlify(),
});
