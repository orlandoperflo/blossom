import './globals.css';

export const metadata = {
  title: 'Blossom Accelerate',
  description: 'Lightning-fast lead capture and conversion site built with Next.js.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
