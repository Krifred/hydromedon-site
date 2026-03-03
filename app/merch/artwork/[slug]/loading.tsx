export default function ArtworkDetailLoading() {
    return (
        <main className="min-h-screen max-w-5xl mx-auto px-6 py-14">
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-square bg-white/5 rounded-sm animate-pulse" />
                <div className="flex flex-col gap-6 pt-2">
                    <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="h-10 w-3/4 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                        <div className="h-3 w-5/6 bg-white/10 rounded animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-9 w-24 border border-white/10 rounded-sm animate-pulse" />
                        <div className="h-9 w-24 border border-white/10 rounded-sm animate-pulse" />
                    </div>
                    <div className="h-11 w-40 border border-white/15 rounded-sm animate-pulse" />
                </div>
            </div>
        </main>
    );
}
