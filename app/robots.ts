import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",       // API routes
                ],
            },
        ],
        sitemap: "https://www.hydromedon.com/sitemap.xml",
        host: "https://www.hydromedon.com",
    };
}
