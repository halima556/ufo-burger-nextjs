export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "UFO Burger",
    description:
      "Premium closed burgers from distant worlds. Cosmic flavor, premium craft, and limited first access in Wallsend.",
    url: "https://ufoburger.com",
    servesCuisine: "Burgers",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wallsend",
      addressCountry: "GB",
    },
    menu: "https://ufoburger.com/#menu",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "Opening soon",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
