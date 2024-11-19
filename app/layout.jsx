import "./globals.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "property, rental, homes",
  description: "Find the perfect rental properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
