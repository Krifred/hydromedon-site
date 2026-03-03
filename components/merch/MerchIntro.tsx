/* ==========================================================
   MerchIntro — top-of-page header for the merch section
   ========================================================== */

export default function MerchIntro() {
    return (
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
            <p className="font-cinzel text-xs tracking-[0.3em] text-yellow-500/60 uppercase mb-4">
                Hydromedon
            </p>
            <h1 className="font-cinzel text-4xl sm:text-5xl text-white/90 tracking-tight mb-6">
                Objects &amp; Artwork
            </h1>
            <p className="text-sm text-white/50 leading-relaxed max-w-prose mx-auto">
                A small, considered collection. Each piece is made to carry
                something of the music — no excess, no noise.
            </p>
        </section>
    );
}
