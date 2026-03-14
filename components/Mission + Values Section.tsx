"use client";

import FadeIn from "./FadeIn";

export default function MissionValues() {
  return (
    <section
      id="mission"
      className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-200"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn delayMs={0}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400 tracking-tight drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]">
            Mission & Values
          </h2>
        </FadeIn>

        {/* Mission */}
        <FadeIn delayMs={180}>
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Our Mission
          </h3>
        </FadeIn>

        <FadeIn delayMs={260}>
          <p className="text-lg leading-relaxed opacity-90 mb-12">
            Hydromedon exists to create cinematic, faith‑rooted music that
            brings comfort, courage, and spiritual clarity to those walking
            through real and difficult seasons of life.  
            We are here to accompany, not to persuade — to offer beauty,
            honesty, and hope through sound, story, and atmosphere.
          </p>
        </FadeIn>

        {/* Values */}
        <FadeIn delayMs={360}>
          <h3 className="text-xl font-semibold text-yellow-300 mb-6">
            Our Values
          </h3>
        </FadeIn>

        <div className="space-y-10 text-left md:text-center">
          <FadeIn delayMs={420}>
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                ✦ Honesty
              </h4>
              <p className="text-gray-300 leading-relaxed">
                We write from real experiences — seasons of loss, renewal,
                doubt, and breakthrough — trusting that authenticity creates
                space for healing.
              </p>
            </div>
          </FadeIn>

          <FadeIn delayMs={520}>
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                ✦ Beauty
              </h4>
              <p className="text-gray-300 leading-relaxed">
                We believe beauty is a form of worship — a way to reflect the
                heart of God through sound, imagery, and atmosphere.
              </p>
            </div>
          </FadeIn>

          <FadeIn delayMs={620}>
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                ✦ Compassion
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Our music is created for those who are hurting, searching, or
                holding onto faith by a thread. We want every listener to feel
                seen, understood, and less alone.
              </p>
            </div>
          </FadeIn>

          <FadeIn delayMs={720}>
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                ✦ Reverence
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Everything we create is rooted in awe — a desire to honor God
                with excellence, humility, and a sense of wonder.
              </p>
            </div>
          </FadeIn>

          <FadeIn delayMs={820}>
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                ✦ Hope
              </h4>
              <p className="text-gray-300 leading-relaxed">
                We hold fast to the belief that light always breaks through.
                Our songs are reminders that grace is real, peace is possible,
                and God is near.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
