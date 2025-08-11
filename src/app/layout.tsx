import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ComponentProvider } from '@/contexts/component-context';
import { cn } from '@/lib/utils';
import { Inter, Space_Grotesk, Courier_Prime } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code',
});

const pageTitle = 'Resistor & Capacitor Code Calculator | Resistor App';
const pageDescription = 'Easily calculate resistor color codes and capacitor 3-digit codes with our intuitive component workbench. A perfect tool for electronics hobbyists and engineers.';

export const metadata: Metadata = {
  title: {
    default: pageTitle,
    template: `%s | Resistor App`,
  },
  description: pageDescription,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: pageTitle,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    siteName: 'Resistor App',
    url: 'https://resistorapp.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          spaceGrotesk.variable,
          courierPrime.variable
        )}
      >
        <ComponentProvider>
          {children}
          <Toaster />
        </ComponentProvider>
      </body>
    </html>
  );
}
