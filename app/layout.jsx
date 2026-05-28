import './globals.css';

export const metadata = {
  title: 'Blossom Accelerate',
  description: 'Lightning-fast lead capture and conversion for ultra-luxury real estate. Captura y conversión de prospectos ultrarrápida para asesores inmobiliarios premium.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      es: '/es',
    },
  },
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
