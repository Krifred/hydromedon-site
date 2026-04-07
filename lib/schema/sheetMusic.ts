import type { Composition, Score } from "@/data/compositions";

export function getCompositionUrl(slug: string) {
  return `https://hydromedon.com/sheet-music/${slug}`;
}

export function getResourcesUrl(slug: string) {
  return `https://hydromedon.com/sheet-music/${slug}/resources`;
}

export function buildMusicCompositionJsonLd(composition: Composition, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    name: composition.title,
    url: getCompositionUrl(slug),
    description: composition.description,
    composer: "Hydromedon",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Key",
        value: composition.technical.key,
      },
      {
        "@type": "PropertyValue",
        name: "Tempo",
        value: composition.technical.tempo,
      },
      {
        "@type": "PropertyValue",
        name: "Time Signature",
        value: composition.technical.timeSignature,
      },
      {
        "@type": "PropertyValue",
        name: "Difficulty",
        value: composition.technical.difficulty,
      },
    ],
  };
}

export function buildScoreProductJsonLd(
  composition: Composition,
  slug: string,
  score: Score
) {
  const url = "url" in score ? score.url : getCompositionUrl(slug);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${composition.title} \u2014 ${score.type}`,
    category: "Sheet Music",
    url,
    offers: {
      "@type": "Offer",
      availability:
        score.status === "coming-soon"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
      url: "url" in score ? score.url : undefined,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Length",
        value: score.details.length,
      },
      {
        "@type": "PropertyValue",
        name: "Instrumentation",
        value: score.details.instrumentation,
      },
    ],
  };
}

export function buildBreadcrumbJsonLdForComposition(composition: Composition, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sheet Music",
        item: "https://hydromedon.com/sheet-music",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: composition.title,
        item: getCompositionUrl(slug),
      },
    ],
  };
}

export function buildBreadcrumbJsonLdForResources(composition: Composition, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sheet Music",
        item: "https://hydromedon.com/sheet-music",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: composition.title,
        item: getCompositionUrl(slug),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Resources",
        item: getResourcesUrl(slug),
      },
    ],
  };
}

export function buildResourcesWebPageJsonLd(composition: Composition, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${composition.title} \u2014 Resources`,
    url: getResourcesUrl(slug),
    description: composition.description,
  };
}
