import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import fs from "node:fs";
import path from "node:path";

// Local middleware plugin to serve images from content directories on localhost
function viteServeContentImages() {
  return {
    name: "serve-content-images",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Intercept local URL requests pointing to article sub-resource paths
        if (
          req.url.startsWith("/articles/") &&
          /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(req.url)
        ) {
          // Translate the browser's web request path into your local file directory layout path
          const cleanUrl = req.url.split("?")[0]; // Strip query variables
          const localFilePath = path.join(
            process.cwd(),
            "src/content",
            cleanUrl,
          );

          if (fs.existsSync(localFilePath)) {
            // Read and serve the physical file buffer back to the browser cleanly
            const fileBuffer = fs.readFileSync(localFilePath);
            const ext = path.extname(localFilePath).toLowerCase();
            const contentType = ext === ".png" ? "image/png" : "image/jpeg"; // Fallback mapping types

            res.setHeader("Content-Type", contentType);
            res.end(fileBuffer);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  output: "server",
  adapter: netlify(),

  vite: {
    plugins: [viteServeContentImages()], // <-- Registers the asset serving middleware
  },

  server: {
    port: 4321,
    headers: {
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Access-Control-Allow-Origin": "*",
    },
  },
});
