/* ==========================================================
   EmptyState — shown when a collection has no products
   ========================================================== */

export default function EmptyState({ label }: { label: string }) {
    return (
        <div className="py-16 text-center">
            <p className="text-sm text-white/30 tracking-widest uppercase">
                {label}
            </p>
        </div>
    );
}
