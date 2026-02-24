import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    return (
        <footer className="py-12 text-center text-hydra-gold">
            <SocialLinks />
            <p className="mt-6 text-sm opacity-70">
                © {new Date().getFullYear()} Hydromedon. All rights reserved.
            </p>
        </footer>
    );
}
