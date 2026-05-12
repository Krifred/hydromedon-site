import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicPreview from "@/components/MusicPreview";
import RecommendedSites from "@/components/RecommendedSitesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from "@/lib/seo";

export const metadata: Metadata = {
    title: `${SITE_NAME} — Christian Dream Pop`,
    description: SITE_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    openGraph: {
        type: "website",
        url: SITE_URL,
        title: `${SITE_NAME} — Christian Dream Pop`,
        description: SITE_DESCRIPTION,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        title: `${SITE_NAME} — Christian Dream Pop`,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
};

const musicGroupJsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: SITE_NAME,
    url: SITE_URL,
    genre: ["Christian", "Dream Pop", "Cinematic", "Worship"],
    description: SITE_DESCRIPTION,
    logo: DEFAULT_OG_IMAGE,
    sameAs: [
        "https://open.spotify.com/artist/6uDb2bAKe11eYOQR1foFQM",
        "https://www.youtube.com/@Hydromedon",
    ],
};

export default function Home() {

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
            />
            <Header />

            <main id="home" className="relative min-h-screen bg-black">
                {/* Dark overlay for extra depth */}
                <div className="pointer-events-none absolute inset-0 bg-black/70 z-0" />

                {/* Page content */}
                <div className="relative z-10">
                    <Hero />

                    {/* ✅ Needed for "/#latest" + active highlight */}
                    <section id="latest" className="scroll-mt-28">
                        <MusicPreview />
                    </section>

                    <SectionDivider />

                    <RecommendedSites />

                    <SectionDivider />

                    <AboutSection />

                    <SectionDivider />

                    {/* ✅ Needed for "/#contact" + active highlight */}
                    <section id="contact" className="scroll-mt-28">
                        <ContactSection />
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
