import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Captify Platform',
  description: 'Strategic alignment and business operations platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}