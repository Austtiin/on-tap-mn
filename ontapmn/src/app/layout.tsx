import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { CookieConsent } from "@/components";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "OnTap MN - Find Bar Bingo, Meat Raffles & More Across Minnesota",
    template: "%s | OnTap MN"
  },
  description: "Discover bar bingo, meat raffles, karaoke, trivia nights, and live music events happening across Minnesota. Your guide to the best bar entertainment.",
  keywords: ["bar bingo", "meat raffles", "karaoke", "trivia", "live music", "Minnesota", "bar events", "entertainment"],
  authors: [{ name: "OnTap MN Team" }],
  creator: "OnTap MN",
  publisher: "OnTap MN",
  metadataBase: new URL("https://ontap-mn.com"),
  openGraph: {
    title: "OnTap MN - Find Bar Bingo, Meat Raffles & More Across Minnesota",
    description: "Discover bar bingo, meat raffles, karaoke, trivia nights, and live music events happening across Minnesota.",
    url: "https://ontap-mn.com",
    siteName: "OnTap MN",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnTap MN - Find Bar Bingo, Meat Raffles & More Across Minnesota",
    description: "Discover bar bingo, meat raffles, karaoke, trivia nights, and live music events happening across Minnesota.",
    creator: "@ontapmn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2545121987507171"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Note: Google Analytics is loaded via CookieConsent component after user consent */}
      </head>
      <body className="antialiased font-sans min-h-screen bg-white text-foreground">
        <ThemeRegistry>
          {children}
          <CookieConsent />
        </ThemeRegistry>
      </body>
    </html>
  );
}
