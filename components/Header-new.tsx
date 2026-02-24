import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
            <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo / Name */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-wide text-yellow-400 hover:text-yellow-300 transition"
                >
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6 text-sm text-gray-300">
                    <Link href="/music" className="hover:text-white transition">
                        Music
                    </Link>

                    <Link
                        href="/about/behind-the-name"
                        className="hover:text-white transition"
                    >
                        About
                    </Link>

                    <Link href="/faith" className="hover:text-white transition">
                        Faith
                    </Link>

                    <Link
                        href="/music#videos"
                        className="hover:text-white transition"
                    >
                        Videos
                    </Link>
                </div>
            </nav>
        </header>
    );
}