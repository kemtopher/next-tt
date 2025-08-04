import Head from 'next/head';
import './globals.css';
import { Kaisei_Opti } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Footer } from '../components/Footer/Footer';
import { QuoteBlock } from '../components/QuoteBlock/QuoteBlock';

const kaiseiOpti = Kaisei_Opti({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-kaisei-opti',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-kaisei-opti',
});

export const metadata = {
  title: 'TT Mahony Is French People',
  description:
    'Website for musician TT Mahony and his band TT Mahony is French People',
};

export default function RootLayout({ children }) {
  const quote = `He who who binds to himself a joy\n\nDoes the winged life destroy;\n\nHe who kisses the joy as it flies\n\nLives in eternity’s sunrise.`;
  const quoteRich = quote.split('\n').map((line, i) => <p key={i}>{line}</p>);

  return (
    <html lang="en">
      <body
        className={`${kaiseiOpti.variable} ${montserrat.variable} px-4 md:px-10 lg:px-18 2xl:max-w-[1700px] 2xl:m-auto`}
      >
        {children}
        <QuoteBlock content={quoteRich} author="William Blake" />
        <Footer />
      </body>
    </html>
  );
}
