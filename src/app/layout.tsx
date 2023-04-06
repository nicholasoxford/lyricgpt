// These styles apply to every route in the application
import "./globals.css";

export const metadata = {
  title: "lyricgpt",
  description: "A new way to find music",
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
