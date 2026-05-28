import LandingPage from '../../components/LandingPage';

export const metadata = {
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      es: '/es',
    },
  },
};

export default function EnglishPage() {
  return <LandingPage initialLanguage="en" />;
}
