// components/IconFrame.tsx
import React from "react";

export default function IconFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="icon group w-24 h-24 cursor-pointer">
            <svg viewBox="0 0 512 512" className="w-full h-full">
                <rect
                    className="
            frame
            fill-transparent stroke-[#8C6F2A]
            group-hover:fill-[#8C6F2A] group-hover:stroke-[#8C6F2A]
            dark:fill-[#8C6F2A] dark:stroke-[#8C6F2A]
            dark:group-hover:fill-transparent dark:group-hover:stroke-[#D4AF37]
          "
                    x="32"
                    y="32"
                    width="448"
                    height="448"
                    rx="48"
                    ry="48"
                    strokeWidth="12"
                />
                {children}
            </svg>
        </div>
    );
}
