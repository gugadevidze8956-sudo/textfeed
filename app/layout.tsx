import "./globals.css";

export const metadata = {
  title: "FOXFEED",
  description: "Georgia Social Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0f0f0f", color: "white" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
