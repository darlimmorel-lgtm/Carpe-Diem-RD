import { createFileRoute } from "@tanstack/react-router";
import { CarpeDiemPage } from "@/components/CarpeDiemPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carpe Diem RD | Restaurante, Terraza y Lounge en Santo Domingo Este" },
      {
        name: "description",
        content:
          "Descubre Carpe Diem RD en la Av. España #56, Santo Domingo Este. Gastronomía dominicana e internacional, terraza, coctelería, eventos y reservas por WhatsApp.",
      },
      { property: "og:title", content: "Carpe Diem RD | Restaurante, Terraza y Lounge" },
      {
        property: "og:description",
        content: "Gastronomía, terraza, coctelería y noches para recordar en Santo Domingo Este.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Carpe Diem RD",
          description:
            "Restaurante, terraza, bar y lounge con gastronomía dominicana e internacional.",
          telephone: "+1 829-520-8453",
          priceRange: "RD$1,000–RD$4,000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. España #56",
            addressLocality: "Santo Domingo Este",
            addressRegion: "Santo Domingo",
            postalCode: "11501",
            addressCountry: "DO",
          },
          openingHours: ["Su-Th 10:00-02:00", "Fr-Sa 10:00-03:00"],
          servesCuisine: ["Dominicana", "Internacional", "Mariscos", "Sushi"],
          menu: "https://www.menudigital.com.do/new-carpe-diem/",
          sameAs: [
            "https://www.instagram.com/carpediem.rd/",
            "https://www.instagram.com/carpe_diemrd/",
          ],
        }),
      },
    ],
  }),
  component: CarpeDiemPage,
});
