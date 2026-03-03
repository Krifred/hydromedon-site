export default function MerchLoading() {
    return (
        <main className="min-h-screen max-w-6xl mx-auto px-6 pt-24 pb-14">
            {/* Intro skeleton */}
            <div className="mb-12 text-center">
                <div className="h-3 w-24 mx-auto bg-white/10 rounded animate-pulse mb-4" />
                <div className="h-8 w-72 mx-auto bg-white/10 rounded animate-pulse mb-4" />
                <div className="h-3 w-96 max-w-full mx-auto bg-white/10 rounded animate-pulse" />
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-sm overflow-hidden border border-white/8">
                        <div className="aspect-square bg-white/5 animate-pulse" />
                        <div className="p-4 space-y-2">
                            <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
                            <div className="h-3 w-1/3 bg-white/10 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
