import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicPreview from "@/components/MusicPreview";
import BehindTheName from "@/components/BehindTheNameSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
    return (
        <>
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

                    <BehindTheName />

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
