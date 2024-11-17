import type { Metadata } from "next";

const siteMetadata: Metadata = {
  title: {
    default:
      "ABS Courier & Freight Systems - Reliable Shipping and Freight Logistics Services",
    template:
      "%s | ABS Courier & Freight Systems - Reliable Shipping and Freight Logistics Services",
  },
  description:
    "ABS Courier & Freight Systems provides reliable and efficient shipping, freight, and logistics services. Specializing in timely deliveries transportation.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/ios/16.png",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://abs-system-v1.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "https://abs-system-v1.vercel.app/en",
      ar: "https://abs-system-v1.vercel.app/ar",
    },
  },
  keywords: [
    "shipping",
    "courier services",
    "freight",
    "logistics",
    "delivery services",
    "global shipping",
    "secure transportation",
    "ABS Courier & Freight Systems",
    "express delivery",
    "freight forwarding",
    "supply chain",
    "cargo",
    "international shipping",
    "domestic shipping",
    "reliable shipping services",
  ],
  publisher: "ABS Courier & Freight Systems",
  openGraph: {
    title:
      "ABS Courier & Freight Systems - Reliable Shipping and Freight Logistics Services",
    description:
      "ABS Courier & Freight Systems provides reliable and efficient shipping, freight, and logistics services. Specializing in timely deliveries transportation.",
    url: "https://abs-system-v1.vercel.app",
    siteName:
      "ABS Courier & Freight Systems - Reliable Shipping and Freight Logistics Services",
    images: [
      {
        url: "/ios/192.png",
        width: 192,
        height: 192,
        alt: "ABS Courier & Freight Systems",
      },
      {
        url: "/ios/512.png",
        width: 512,
        height: 512,
        alt: "ABS Courier & Freight Systems",
      },
      {
        url: "/ios/512.png",
        width: 512,
        height: 512,
        alt: "ABS Courier & Freight Systems",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title:
      "ABS Courier & Freight Systems - Reliable Shipping and Freight Logistics Services",
    card: "summary_large_image",
    images: [
      {
        url: "/ios/192.png",
        width: 192,
        height: 192,
        alt: "ABS Courier & Freight Systems",
      },
      {
        url: "/ios/512.png",
        width: 512,
        height: 512,
        alt: "ABS Courier & Freight Systems",
      },
      {
        url: "/ios/512.png",
        width: 512,
        height: 512,
        alt: "ABS Courier & Freight Systems",
      },
    ],
    description:
      "ABS Courier & Freight Systems provides reliable and efficient shipping, freight, and logistics services. Specializing in timely deliveries transportation.",
  },
};

export default siteMetadata;
