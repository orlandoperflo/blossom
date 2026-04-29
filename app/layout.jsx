import './globals.css';

export const metadata = {
  title: 'Blossom Accelerate',
  description: 'Lightning-fast lead capture and conversion site built with Next.js.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
