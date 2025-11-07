export const metadata = {
  title: 'Cheapest Forex Prop Firms',
  description: 'Find the cheapest forex prop firm challenges by account size',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="container">
          <h1>Cheapest Forex Prop Firms</h1>
          <p className="muted">Simple, transparent, up-front challenge fee comparison. Data is curated and may be outdated ? always verify on the firm?s site.</p>
        </header>
        <main className="container">{children}</main>
        <footer className="container footer">
          <p>Built for quick comparisons. No affiliation with any firm.</p>
        </footer>
      </body>
    </html>
  );
}
