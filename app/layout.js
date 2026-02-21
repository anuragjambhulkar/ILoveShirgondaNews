import './globals.css';
import { Toaster } from 'sonner';
import Script from 'next/script';

export const metadata = {
  title: 'I Love Shrigonda News - Your Love for the City',
  description: 'Stay updated with the latest news from Shrigonda and beyond',
  metadataBase: new URL('https://news.iloveshrigonda.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'I Love Shrigonda News',
    description: 'Stay updated with the latest news from Shrigonda and beyond',
    url: 'https://news.iloveshrigonda.com',
    siteName: 'I Love Shrigonda News',
    images: [
      {
        url: 'https://customer-assets.emergentagent.com/job_754a0040-d589-4dfd-90f1-615496373220/artifacts/7inmznbe_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'I Love Shrigonda News Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Love Shrigonda News',
    description: 'Stay updated with the latest news from Shrigonda and beyond',
    images: ['https://customer-assets.emergentagent.com/job_754a0040-d589-4dfd-90f1-615496373220/artifacts/7inmznbe_logo.jpg'],
  },
  icons: {
    icon: 'https://customer-assets.emergentagent.com/job_754a0040-d589-4dfd-90f1-615496373220/artifacts/7inmznbe_logo.jpg',
    shortcut: 'https://customer-assets.emergentagent.com/job_754a0040-d589-4dfd-90f1-615496373220/artifacts/7inmznbe_logo.jpg',
    apple: 'https://customer-assets.emergentagent.com/job_754a0040-d589-4dfd-90f1-615496373220/artifacts/7inmznbe_logo.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" richColors closeButton />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E0YG22BBCQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E0YG22BBCQ');
          `}
        </Script>
      </body>
    </html>
  );
}