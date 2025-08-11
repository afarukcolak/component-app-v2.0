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

export const metadata: Metadata = {
  title: 'Resistor & Capacitor Code Calculator | Resistor App',
  description: 'Easily calculate resistor color codes and capacitor 3-digit codes with our intuitive component workbench. A perfect tool for electronics hobbyists and engineers.',
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
