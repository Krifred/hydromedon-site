// app/about/page.tsx
import AboutSection from "@/components/AboutSection";
import RecommendedSitesSection from "@/components/RecommendedSitesSection";
import StatementOfFaith from "@/components/StatementOfFaithSection";
import SectionDivider from "@/components/SectionDivider";

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