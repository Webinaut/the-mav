import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import { visit } from "unist-util-visit"; // <-- Ensure you installed this via npm in the previous step

// Unified local plugin function block
function remarkFloatedImages() {
  return (tree) => {
    visit(tree, "image", (node) => {
      const { url } = node;

      // Intercept and parse our custom Sveltia configuration hash parameters
      if (url && url.includes("#")) {
        const [cleanUrl, hashParams] = url.split("#");
        const [align, sizeClass, marginClass] = hashParams.split("_");

        // 1. Strip the hash payload so Astro's asset pipeline can bundle the image natively
        node.url = cleanUrl;

        // 2. Initialize layout data layers on the rendering node
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};

        // 3. Assemble clean, production-ready HTML stylesheet classes
        const classes = ["cms-floated-image"];
        if (align) classes.push(`align-${align}`);
        if (sizeClass) classes.push(sizeClass);
        if (marginClass) classes.push(marginClass);

        // Assign classes directly to the final compiled HTML element string
        node.data.hProperties.class = classes.join(" ");
      }
    });
  };
}

export default defineConfig({
  output: "server",
  adapter: netlify(),

  // Registers your layout processor directly into the core Markdown engine
  markdown: {
    remarkPlugins: [remarkFloatedImages],
  },

  server: {
    port: 4321,
    headers: {
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Access-Control-Allow-Origin": "*",
    },
  },
});
