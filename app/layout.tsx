import type { Metadata } from 'next';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SubHeader from './components/Header/SubHeader';
import './globals.css';

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
        <SubHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
