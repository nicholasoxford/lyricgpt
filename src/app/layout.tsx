// These styles apply to every route in the application
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find music using AI  ",
  description: "Trained on the lyrics of 8k+ songs",
  openGraph: {
    type: "website",
    url: "https://lyricgpt.io",
    title: "lyricgpt - A New Way to Find Music",
    description: "A new way to find music",
    images: [
      {
        url: "https://images.lyricgpt.io/website.png",
        alt: "lyricgpt",
      },
    ],
  },
  twitter: {
    creator: "@ApolloToday",
    description: "A new way to find music",
    images: {
      url: "https://images.lyricgpt.io/website.png",
      alt: "lyricgpt",
    },
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
