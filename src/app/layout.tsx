// These styles apply to every route in the application
import "./globals.css";

export const metadata = {
  title: "lyricgpt",
  description: "A new way to find music",
  opengraph: {
    type: "website",
    url: "https://lyricgpt.com",
    title: "lyricgpt",
    description: "A new way to find music",
    image: "https://images.lyricgpt.io/website.png",
    images: [
      {
        url: "https://images.lyricgpt.io/website.png",
        alt: "lyricgpt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lyricgpt",
    title: "lyricgpt - A New Way to Find Music",
    description:
      "Discover new music and explore lyrics with lyricgpt, the latest AI-powered music search engine.",
    image: {
      url: "https://images.lyricgpt.io/website.png",
      alt: "lyricgpt",
    },
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
