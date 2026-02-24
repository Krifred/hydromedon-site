import FadeIn from "./FadeIn";
export default function ContactSection() {
  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 py-24 text-center text-gray-200">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn delayMs={0}>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Contact</h2>
        </FadeIn>
        <FadeIn delayMs={180}>
          <p className="text-lg opacity-80">This is a placeholder for the Contact section.</p>
        </FadeIn>
        <FadeIn delayMs={360}>
          {/* Form block placeholder - preserve fields/styles if present */}
        </FadeIn>
      </div>
    </section>
  );
}
