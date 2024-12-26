import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// import { remarkReadingTime } from "./remark-reading-time.mjs";
import netlify from "@astrojs/netlify";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  site: "https://themaverick.net.au",
  integrations: [sitemap(), preact()],
  markdown: {
    // remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  output: "server",
  adapter: netlify(),
});
