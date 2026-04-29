import Image from 'next/image';
import HeroIntentGate from './HeroIntentGate';

export default function LandingPageShell() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <HeroIntentGate />

      <section className="py-20 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">Your Pipeline Is Leaking Revenue.</h2>
          <p className="text-slate-500 text-xl max-w-3xl">Most teams do not have a lead problem—they have an infrastructure problem.</p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
          <article className="p-8 rounded-3xl bg-white border">Sub-5 Second Response</article>
          <article className="p-8 rounded-3xl bg-white border">Intelligent Qualification</article>
          <article className="p-8 rounded-3xl bg-white border">Automated Booking</article>
        </div>
      </section>

      <section className="py-20 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Your speed wins.</h2>
            <p className="text-slate-600">We integrate your channels, qualify instantly, and route qualified conversations to your team.</p>
          </div>
          <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" alt="Luxury Home" width={1200} height={800} className="w-full h-auto rounded-[40px]" />
        </div>
      </section>

      <footer className="py-16 md:py-24 px-4 sm:px-6 border-t border-black/5 bg-white text-center font-black text-2xl">blossom accelerate</footer>
    </div>
  );
}
