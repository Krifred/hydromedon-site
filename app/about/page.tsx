// app/about/page.tsx
import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import RecommendedSitesSection from "@/components/RecommendedSitesSection";
import StatementOfFaith from "@/components/StatementOfFaithSection";
import SectionDivider from "@/components/SectionDivider";
import { abs, DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";

export const metadata: Metadata = {
    title: `About | ${SITE_NAME}`,
    description: `Learn about Hydromedon — a Christian dream pop music project creating cinematic, devotional soundscapes from the Biblical Graffiti universe.`,
    alternates: { canonical: abs("/about") },
    openGraph: {
        type: "website",
        url: abs("/about"),
        title: `About | ${SITE_NAME}`,
        description: `Learn about Hydromedon — a Christian dream pop music project creating cinematic, devotional soundscapes.`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        title: `About | ${SITE_NAME}`,
        description: `Learn about Hydromedon — a Christian dream pop music project.`,
        images: [DEFAULT_OG_IMAGE],
    },
};

export default function AboutPage() {
    return (
        <main className="relative bg-black text-gray-200">
            <AboutSection />
            <SectionDivider />
            <RecommendedSitesSection />
            <SectionDivider />
            <StatementOfFaith />
        </main>
    );
}