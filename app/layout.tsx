import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SubHeader from './components/Header/SubHeader';
import { SubHeaderSkeleton } from './components/Header/SubHeaderSkeleton';
import './globals.css';
import './styles/transitions.css';

export const metadata: Metadata = {
  title: 'Maisons Pour Tous - Montpellier',
  description: 'Découvrez les Maisons Pour Tous de Montpellier et leurs activités',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <Suspense fallback={<SubHeaderSkeleton />}>
          <SubHeader />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
