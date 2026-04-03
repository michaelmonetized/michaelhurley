import type { MetadataRoute } from "next";
import { project } from "@/project";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${project.url}/sitemap.xml`,
  };
}
