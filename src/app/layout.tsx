import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-heading)]">
      {children}
    </div>
  );
}
