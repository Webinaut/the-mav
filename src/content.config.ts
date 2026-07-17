import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; //

const articles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/articles",
  }), //
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

export const collections = { articles }; //
