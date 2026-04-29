import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('../components/LandingPage'), {
  loading: () => (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-slate-500 font-medium">Loading experience...</p>
    </main>
  ),
});

export default function HomePage() {
  return <LandingPage />;
}
