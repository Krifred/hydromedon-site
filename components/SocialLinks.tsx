"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { name: "YouTube", href: "https://youtube.com/@hydromedon", icon: "/social/youtube-gold.svg" },
  { name: "Spotify", href: "https://open.spotify.com/artist/...", icon: "/social/spotify-gold.svg" },
  { name: "Instagram", href: "https://instagram.com/hydromedon", icon: "/social/instagram-gold.svg" },
  { name: "TikTok", href: "https://tiktok.com/@hydromedon", icon: "/social/tiktok-gold.svg" },
  { name: "Facebook", href: "https://facebook.com/hydromedon", icon: "/social/facebook-gold.svg" },
  { name: "X", href: "https://x.com/hydromedon", icon: "/social/x-gold.svg" },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="
            transition-transform duration-300
            hover:-translate-y-1
            hover:scale-105
          "
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={36}
            height={36}
            className="
              drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]
              hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.85)]
              transition-all duration-300
            "
          />
        </Link>
      ))}
    </div>
  );
}
