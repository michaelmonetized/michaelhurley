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
    name: "Michael Hurley",
    short_name: "Michael Hurley",
    description:
      "Business operations, growth, design, and software development profile for Michael Hurley.",
    categories: ["business", "portfolio", "design"],
  };
}
