import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGNEY — Designer · Developer · Co-Founder',
  description: 'World-class editorial personal portfolio of Agney — Designer, Front-End Engineer, Creative Technologist, Video Editor, and Co-Founder of TEB Innovations.',
  keywords: ['Agney', 'TEB Innovations', 'Designer', 'Developer', 'Co-Founder', 'UI/UX', 'Next.js', 'Motion Design', 'Creative Technology', 'Malappuram'],
  authors: [{ name: 'Agney' }],
  openGraph: {
    title: 'AGNEY — Designer · Developer · Co-Founder',
    description: 'Digital craft, identities, web platforms, motion reels, and youth robotics incubators by Agney.',
    url: 'https://agney.dev',
    siteName: 'AGNEY Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-paper-light dark:bg-dark-bg text-ink dark:text-dark-text antialiased selection:bg-accent selection:text-white transition-colors duration-400">
        <div className="bg-grain fixed inset-0 pointer-events-none z-50 opacity-30" />
        {children}
      </body>
    </html>
  );
}
