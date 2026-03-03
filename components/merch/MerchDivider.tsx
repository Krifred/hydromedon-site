/* ==========================================================
   MerchDivider — thin gold rule between Objects / Artwork
   ========================================================== */

export default function MerchDivider() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            <div
                className="h-px w-full"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)",
                }}
            />
        </div>
    );
}
