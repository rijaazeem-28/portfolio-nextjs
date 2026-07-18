import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rija-azeem.dev",
      lastModified: new Date(),
    },
    {
      url: "https://rija-azeem.dev/#about",
    },
    {
      url: "https://rija-azeem.dev/#skills",
    },
    {
      url: "https://rija-azeem.dev/#portfolio",
    },
    {
      url: "https://rija-azeem.dev/#services",
    },
    {
      url: "https://rija-azeem.dev/#experience",
    },
    {
      url: "https://rija-azeem.dev/#education",
    },
    {
      url: "https://rija-azeem.dev/#contact",
    },
  ];
}
