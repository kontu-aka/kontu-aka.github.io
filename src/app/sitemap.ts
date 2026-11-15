import type { MetadataRoute } from "next";

// output: 'export' requires these route handlers to be explicitly static.
export const dynamic = "force-static";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/* One page, one entry. lastModified is left out on purpose: taking it from the
   build clock would change the exported bytes on every rebuild without
   anything on the page having changed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `https://kontu-aka.github.io${basePath}/`, changeFrequency: "monthly", priority: 1 }];
}
