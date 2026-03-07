/**
 * ─────────────────────────────────────────────────────────────────
 *  SEO.tsx  —  Songkran Bangkok 2026 @ Chapter Market
 *  Full SEO head component — paste inside your <App /> or page root
 *
 *  Requirements:
 *    npm install react-helmet-async
 *    Wrap your app root with <HelmetProvider> from react-helmet-async
 * ─────────────────────────────────────────────────────────────────
 */

import { Helmet } from "react-helmet-async";

// ── Replace this URL with your actual deployed domain ──
const SITE_URL = "https://www.songkran-chapter.com/";
const PAGE_URL = `${SITE_URL}/songkran-2026`;

// ── OG image: export a 1200×630 poster and host it statically ──
const OG_IMAGE = `${SITE_URL}/og/songkran-2026-og-v1.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

// ── JSON-LD structured data ──────────────────────────────────────
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Songkran Bangkok 2026 @ Chapter Market",
  alternateName: ["สงกรานต์ 2026", "Songkran Festival Bangkok 2026"],
  description:
    "Experience authentic Songkran 2026 at Chapter Market, Sukhumvit Soi 26, Bangkok. Hands-on Thai workshops (Khao Tom Mud, Som Tam, Flower Garland Making, Water Blessing), live cultural shows (Mor Lam, Long Drum Dance), traditional Thai costume, local market, street food, and the famous water fight zone — 13–15 April 2026.",
  image: [OG_IMAGE],
  startDate: "2026-04-13T10:00:00+07:00",
  endDate: "2026-04-15T22:00:00+07:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Chapter Market",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sukhumvit Soi 26",
      addressLocality: "Wattana",
      addressRegion: "Bangkok",
      postalCode: "10110",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.7278,
      longitude: 100.5696,
    },
    url: "https://maps.google.com/?q=Chapter+Market+Sukhumvit+26+Bangkok",
  },
  organizer: {
    "@type": "Organization",
    name: "Chapter Market",
    url: SITE_URL,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Early Bird Ticket",
      price: "2000",
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      validFrom: "2026-03-01",
      validThrough: "2026-03-31",
      url: `${PAGE_URL}#book`,
    },
    {
      "@type": "Offer",
      name: "Standard Ticket",
      price: "2500",
      priceCurrency: "THB",
      availability: "https://schema.org/InStock",
      validFrom: "2026-04-01",
      validThrough: "2026-04-15",
      url: `${PAGE_URL}#book`,
    },
  ],
  performer: [
    { "@type": "PerformingGroup", name: "Mor Lam Traditional Music Group" },
    { "@type": "PerformingGroup", name: "Long Drum Dance (Glong Yao) Ensemble" },
  ],
  inLanguage: ["th", "en"],
  keywords:
    "Songkran 2026, สงกรานต์ 2026, Songkran Bangkok, Thai New Year Festival, Chapter Market, Sukhumvit 26, Thai workshop Bangkok, water festival Bangkok, Songkran party Bangkok",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Chapter Market",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Events",
      item: `${SITE_URL}/events`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Songkran Bangkok 2026",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Songkran 2026 at Chapter Market is on what dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Songkran 2026 at Chapter Market runs from 13 to 15 April 2026 at Sukhumvit Soi 26, Bangkok.",
      },
    },
    {
      "@type": "Question",
      name: "How much is the ticket for Songkran 2026 Chapter Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early Bird tickets are 2,000 THB (valid 1–31 March 2026). Standard tickets are 2,500 THB from 1 April onwards.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get to Chapter Market Sukhumvit 26?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take BTS Skytrain to Phrom Phong station, use Exit 4, and walk approximately 450 metres to Chapter Market on Sukhumvit Soi 26.",
      },
    },
    {
      "@type": "Question",
      name: "What activities are available at Songkran Chapter Market 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Activities include hands-on Thai workshops (Khao Tom Mud, Som Tam, Flower Garland Making, Water Blessing Ritual), live cultural shows (Mor Lam, Long Drum Dance, Hae Thong Procession), Thai costume dressing, local market, authentic Thai street food, and a water fight zone.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a water fight zone at Songkran 2026 Chapter Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — a dedicated water fight zone is available for the classic Songkran water battle experience. Come ready to get wet!",
      },
    },
  ],
};

// ── Component ────────────────────────────────────────────────────
export default function SongkranSEO() {
  const title = "Songkran Bangkok 2026 @ Chapter Market | สงกรานต์ 13–15 เมษายน";
  const description =
    "ฉลองสงกรานต์ 2026 ที่ Chapter Market สุขุมวิท 26 กรุงเทพ · Workshop ไทย · โชว์วัฒนธรรม · ตลาด · Water Fight Zone · 13–15 เมษายน 2026 · บัตรเอิร์ลี่เบิร์ด 2,000 บาท";

  return (
    <Helmet>
      {/* ── Charset & Viewport ─────────────────────────────── */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* ── Primary Meta ───────────────────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Songkran 2026, สงกรานต์ 2026, Songkran Bangkok, Thai New Year 2026, Chapter Market, Sukhumvit 26, สงกรานต์ Chapter Market, water festival Bangkok, Thai workshop Bangkok, Songkran party Bangkok, งานสงกรานต์กรุงเทพ, สงกรานต์สุขุมวิท"
      />
      <meta name="author" content="Chapter Market" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />

      {/* ── Canonical ──────────────────────────────────────── */}
      <link rel="canonical" href={PAGE_URL} />

      {/* ── Language alternates (Thai + English) ───────────── */}
      <link rel="alternate" hrefLang="th" href={`${PAGE_URL}?lang=th`} />
      <link rel="alternate" hrefLang="en" href={`${PAGE_URL}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />

      {/* ── Open Graph (Facebook / Line / LinkedIn) ────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Chapter Market" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content="Songkran Bangkok 2026 @ Chapter Market Sukhumvit 26" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="th_TH" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* ── Twitter / X Card ───────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="Songkran Bangkok 2026 @ Chapter Market Sukhumvit 26" />
      {/* Replace with your actual Twitter/X handle */}
      <meta name="twitter:site" content="@ChapterMarketBKK" />
      <meta name="twitter:creator" content="@ChapterMarketBKK" />

      {/* ── Geo Tags (helps local search) ──────────────────── */}
      <meta name="geo.region" content="TH-10" />
      <meta name="geo.placename" content="Bangkok, Thailand" />
      <meta name="geo.position" content="13.7278;100.5696" />
      <meta name="ICBM" content="13.7278, 100.5696" />

      {/* ── Theme color (Chrome address bar) ───────────────── */}
      <meta name="theme-color" content="#F5C800" />
      <meta name="msapplication-TileColor" content="#F5C800" />

      {/* ── Favicon set ────────────────────────────────────── */}
      {/* Place these files in /public: */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* ── Preconnect (performance = Core Web Vitals) ─────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* ── Structured Data: Event ─────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>

      {/* ── Structured Data: Breadcrumb ────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* ── Structured Data: FAQ ───────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
