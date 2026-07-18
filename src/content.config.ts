import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      ranking: z.number(),
      view_count: z.number().default(0),
      hero: image(),
      caption: z.string().optional(),
      summary: z.string(),
      tags: z.array(z.string()).default(["articles"]),
    }),
});

// FIXED: Export collections safely without top-level transform keys to avoid TS errors
export const collections = { articles };

// MIDDLEWARE POST-PROCESSING INTERCEPTOR MATRIX
// This cleans the markdown strings before rendering to ensure Astro bundles images natively
export function processArticleMarkdown(bodyText: string) {
  if (!bodyText) return bodyText;

  // Regular expression targeting: ![Alt](./image.png#left_size-medium_margin-normal)
  const imageRegex =
    /!\[(?<alt>[^\]]*)\]\((?:\.\/)?(?<image>[^)#\s]+)#(?<align>left|right|center)_(?<size_class>[a-zA-Z0-9_-]+)\)/g;

  return bodyText.replace(
    imageRegex,
    (match, alt, image, align, size_class) => {
      const cleanSrc = image.startsWith("./") ? image : `./${image}`;
      const parts = size_class.split("_");
      const size = parts[0] || "size-medium";
      const margin = parts[1] || "margin-normal";

      // Output raw native image elements that Astro's engine reads perfectly
      return `<img src="${cleanSrc}" alt="${alt}" class="cms-floated-image align-${align} ${size} ${margin}" />`;
    },
  );
}
