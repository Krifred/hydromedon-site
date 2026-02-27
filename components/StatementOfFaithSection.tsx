// components/StatementOfFaith.tsx
"use client";

import FadeIn from "@/components/FadeIn";

export default function StatementOfFaithSection() {
    return (
        <section
            id="statement-of-faith"
            className="scroll-mt-28 max-w-4xl mx-auto px-4 py-24 text-gray-200"
        >
            <div className="mx-auto max-w-3xl px-6">
                <FadeIn delayMs={0}>
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-6 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        Statement of Faith
                    </h2>
                </FadeIn>

                <FadeIn delayMs={180}>
                    <p className="text-left leading-relaxed opacity-90 mb-6">
                        Hydromedon is rooted in the historic Christian faith — not as a
                        marketing angle, but as the source of hope beneath the lament. This
                        project exists because Jesus is real, present, and faithful even in
                        the silence, even in the storm, even in the long night.
                    </p>
                </FadeIn>

                <FadeIn delayMs={360}>
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 md:p-6">
                        <ul className="space-y-3 text-left leading-relaxed text-white/85">
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe in one God — Father, Son, and Holy Spirit — eternal,
                                holy, and good.
                            </li>
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe the Scriptures are the trustworthy Word of God,
                                revealing His character and His saving work.
                            </li>
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe Jesus Christ is fully God and fully man, crucified
                                and risen, the only Savior and the truest hope of the world.
                            </li>
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe grace is not earned — it is given — and that God
                                meets the brokenhearted with mercy and restoration.
                            </li>
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe the Holy Spirit comforts, convicts, renews, and
                                empowers believers to live in love and truth.
                            </li>
                            <li>
                                <span className="text-yellow-400/90 font-semibold">•</span>{" "}
                                We believe Christ will return, and that all things will be made
                                new — sorrow will end, justice will stand, and joy will remain.
                            </li>
                        </ul>
                    </div>
                </FadeIn>

                <FadeIn delayMs={540}>
                    <p className="text-left leading-relaxed opacity-90 mt-6">
                        This is not here to pressure anyone. It is simply clarity: these
                        songs come from a life being held by Christ, and they are offered as
                        companionship for anyone walking through shadow toward light.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
