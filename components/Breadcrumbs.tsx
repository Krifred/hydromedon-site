import Link from "next/link";
import { Release } from "@/lib/releases";

function typeToCategory(type: Release["type"]) {
    switch (type) {
        case "Single":
            return { label: "Singles", href: "/music#singles" };
        case "Album":
            return { label: "Albums", href: "/music#albums" };
        case "Video":
            return { label: "Videos", href: "/music#videos" };
        default:
            return { label: "Music", href: "/music" };
    }
}

export default function Breadcrumbs({ release }: { release: Release }) {
    const category = typeToCategory(release.type);

    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-4 text-sm text-gray-400"
        >
            <ol className="flex items-center gap-2">
                <li>
                    <Link
                        href="/music"
                        className="hover:text-yellow-400 transition"
                    >
                        Music
                    </Link>
                </li>

                <li className="opacity-60">/</li>

                <li>
                    <Link
                        href={category.href}
                        className="hover:text-yellow-400 transition"
                    >
                        {category.label}
                    </Link>
                </li>

                <li className="opacity-60">/</li>

                <li className="text-yellow-300 font-medium">
                    {release.title}
                </li>
            </ol>
        </nav>
    );
}
