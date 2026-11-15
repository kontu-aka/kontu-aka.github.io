import type { MetadataRoute } from "next";

// output: 'export' requires these route handlers to be explicitly static.
export const dynamic = "force-static";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/* Static export writes this out as out/robots.txt. The site is one public page
   with nothing to hide from a crawler, so the rule is deliberately plain. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://kontu-aka.github.io${basePath}/sitemap.xml`,
  };
}
