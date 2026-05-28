import LandingPage from '../../components/LandingPage';

export const metadata = {
  alternates: {
    canonical: '/es',
    languages: {
      en: '/en',
      es: '/es',
    },
  },
};

export default function SpanishPage() {
  return <LandingPage initialLanguage="es" />;
}
