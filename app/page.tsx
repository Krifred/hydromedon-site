import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicPreview from "@/components/MusicPreview";
import BehindtheName from "@/components/BehindtheName";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main
                id="home"
                className="relative min-h-screen bg-black"
            >
                {/* Dark overlay for extra depth */}
                <div className="pointer-events-none absolute inset-0 bg-black/70 z-0" />

                {/* Page content */}
                <div className="relative z-10">
                    <Hero />
                    <MusicPreview />
                    <BehindtheName />
                    <AboutSection />
                    <ContactSection />
                </div>
            </main>
            <Footer />
        </>
    );
}
