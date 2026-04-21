import localFont from 'next/font/local';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { ThemeProvider } from '@/context/ThemeContext';

const averta = localFont({
  src: [
    {
      path: '../../public/fonts/Averta Cyrillic Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Thin Italic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Extra Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Extra Thin Italic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Regular Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic SemiBold Italic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Bold Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic ExtraBold Italic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Averta Cyrillic Black Italic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-averta',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${averta.variable} font-averta dark:bg-gray-900`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
