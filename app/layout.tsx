import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Civic Strategy Partners | GSA Schedule Consulting',
  description: 'Expert guidance for federal market success. Professional government contracting consulting services specializing in GSA MAS contracts and federal marketplace strategy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-na2.hs-scripts.com/244293135.js"></script>
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  );
}
