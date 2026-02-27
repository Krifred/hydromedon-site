// app/about/page.tsx
import AboutSection from "@/components/AboutSection";
import BehindTheName from "@/components/BehindTheNameSection";
import StatementOfFaith from "@/components/StatementOfFaithSection";
import SectionDivider from "@/components/SectionDivider";

export default function AboutPage() {
    return (
        <main className="relative bg-black text-gray-200">
            <AboutSection />
            <SectionDivider />
            <BehindTheName />
            <SectionDivider />
            <StatementOfFaith />
        </main>
    );
}