import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    lang: "en",
    dir: "ltr",
    scope: "/",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#209fb5",
    background_color: "#1e1e2e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    name: "Design Gallery starter template",
    short_name: "Design Gallery",
    description:
      "Modern web design starter template with Next.js, Tailwind CSS, shadcn/ui, catpuccin base pallet, next-themes, phosphor-icons, Source* fonts, and more.",
    categories: ["productivity", "business", "marketing"],
  };
}
