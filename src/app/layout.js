import Head from 'next/head'

import "./globals.css";
import { Kaisei_Opti } from 'next/font/google';

const kaiseiOpti = Kaisei_Opti({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-kaisei-opti',
});


export const metadata = {
  title: "TT Mahony Is French People",
  description: "Website for musician TT Mahony and his band TT Mahony is French People",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kaiseiOpti.variable} px-4 md:px-10 lg:px-18`}
      >
        {children}
      </body>
    </html>
  );
}
