// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Import the glob loader
import { glob } from "astro/loaders";

// Define a `loader` and `schema` for each collection
const articleCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      hero: image(),
      caption: z.string(),
      summary: z.string(),
      ranking: z.number(),
      tags: z.array(z.string()),
      readingTime: z.number(),
      views: z.number(),
    }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  articles: articleCollection,
};
