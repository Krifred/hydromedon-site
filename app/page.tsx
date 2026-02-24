import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicPreview from "@/components/MusicPreview";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main id="top">
                <Hero />
                <MusicPreview />
                <AboutSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
