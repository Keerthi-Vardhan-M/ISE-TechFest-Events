import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { EVENT_LIST, ORGANISER_INFO } from "@/content/events";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const cleanUrl = ORGANISER_INFO.siteUrl.replace(/[\[\]]/g, "");

export const metadata: Metadata = {
  metadataBase: new URL(cleanUrl.startsWith("http") ? cleanUrl : "https://events.example.edu"),
  title: `${ORGANISER_INFO.festName} | Automate Boring Task & QuantFinance`,
  description: ORGANISER_INFO.heroSubline,
  openGraph: {
    title: `${ORGANISER_INFO.festName} — Automate Boring Task & QuantFinance`,
    description: ORGANISER_INFO.heroSubline,
    type: "website",
    siteName: ORGANISER_INFO.clubName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${ORGANISER_INFO.festName} — Automate Boring Task & QuantFinance`,
    description: ORGANISER_INFO.heroSubline,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": EVENT_LIST.map((ev) => ({
      "@type": "Event",
      name: ev.name,
      description: ev.description,
      startDate: ev.dateISO,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: ev.venue,
        address: ORGANISER_INFO.collegeName,
      },
      organizer: {
        "@type": "Organization",
        name: `${ORGANISER_INFO.clubName}, ${ORGANISER_INFO.collegeName}`,
        email: ORGANISER_INFO.contactEmail,
      },
      offers: {
        "@type": "Offer",
        price: ev.feeInr,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}
    >
      <body className="antialiased selection:bg-[#22E5FF]/25 selection:text-white">
        <div className="noise-overlay" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

