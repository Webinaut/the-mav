import { getStore } from "@netlify/blobs";
import { Config } from "@netlify/edge-functions";
import process from "node:process";
export const config: Config = {
  path: "/api/get-views",
};

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { slug } = await req.json();

  if (!slug) {
    return new Response("Slug is required", { status: 400 });
  }

  const store = getStore({
    name: "article-views",
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_BLOB_TOKEN,
  });

  // Get current views
  let views = 0;
  try {
    const data = await store.get(`${slug}.txt`);
    if (data) {
      views = parseInt(await data, 10);
    }
  } catch (error) {
    console.error("Error reading views:", error);
  }

  // await store.get(`${slug}.txt`);

  return new Response(JSON.stringify({ views }), {
    headers: { "Content-Type": "application/json" },
  });
};
