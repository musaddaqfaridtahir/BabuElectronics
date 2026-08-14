import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Babu Electronics Pakpattan | Cash & Easy Installment Store",
  description: "Buy Motorbikes, EVs, Refrigerators, LEDs, ACs, Washing Machines, Microwave Ovens, Water Dispensers & Mobiles on easy 6 to 16-month installments in Pakpattan.",
  keywords: [
    "Installment shop in Pakpattan",
    "Babu Electronics Pakpattan",
    "Bikes on installment Pakpattan",
    "Refrigerators on installment Pakpattan",
    "ACs on installment Pakpattan",
    "Microwave oven on installment Pakpattan",
    "Water dispenser on installment Pakpattan",
    "Mobiles on installment Pakpattan",
    "Sahiwal Road Pakpattan electronics store",
  ],
  openGraph: {
    title: "Babu Electronics Pakpattan | Cash & Easy Installment Store",
    description: "Pakpattan's #1 trusted store for Motorbikes, Home Appliances & Mobiles on easy 6 to 16-month installments.",
    url: "https://babuelectronics.com",
    siteName: "Babu Electronics",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Babu Electronics Pakpattan Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Babu Electronics Pakpattan | Easy Installments",
    description: "Motorbikes, Refrigerators, LEDs, ACs & Smartphones on easy monthly installments in Pakpattan.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Babu Electronics",
    "image": "https://babuelectronics.com/logo.png",
    "telephone": "+92311122125",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sahiwal Road",
      "addressLocality": "Pakpattan",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.33488665",
      "longitude": "73.3826581"
    },
    "url": "https://babuelectronics.com",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "priceRange": "PKR"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
