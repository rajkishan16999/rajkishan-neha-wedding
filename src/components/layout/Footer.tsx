import { ChevronUp, Heart } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { GoldDivider, Lotus } from '../ornaments/Ornaments';
import { scrollToSection } from '../../hooks/useActiveSection';

export function Footer() {
  const { groom, bride, messages, sender } = weddingConfig;

  return (
    <footer className="relative bg-royal text-ivory py-16 sm:py-20 border-t border-gold/40 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-gold blur-[120px]" />
      </div>

      <div className="container-wedding relative z-20 text-center">
        {/* Lotus Ornament */}
        <div className="mx-auto mb-6 flex justify-center text-champagne/80">
          <Lotus className="h-8 w-12" />
        </div>

        {/* Sanskrit Shloka */}
        <p className="text-deva text-champagne text-sm sm:text-base mb-4 tracking-wide font-medium">
          ॥ ॐ श्री गणेशाय नमः · सदा सर्वदा प्रीतिरेवास्तु ॥
        </p>

        {/* Monogram */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/50 bg-wine/60 font-serif text-xl font-bold text-champagne shadow-md">
          R<span className="text-gold text-sm font-sans">&amp;</span>N
        </div>

        {/* Names */}
        <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-ivory uppercase mb-2">
          {groom.firstName} <span className="text-gold-gradient font-light italic">&amp;</span> {bride.firstName}
        </h3>

        {/* Tagline */}
        <p className="font-serif italic text-base sm:text-lg text-champagne/90 mb-6">
          "{messages.footerTagline}"
        </p>

        <div className="flex justify-center my-6">
          <GoldDivider className="opacity-60" />
        </div>

        {/* Family message */}
        <p className="mx-auto max-w-xl font-sans text-xs sm:text-sm text-ivory/80 leading-relaxed mb-8">
          {messages.familyMessage}
        </p>

        {/* Host Compliments */}
        <div className="mb-10 text-xs text-champagne/75 space-y-1">
          <p className="font-semibold text-champagne uppercase tracking-widest text-[0.7rem]">
            With Warm Blessings &amp; Compliments From
          </p>
          <p className="font-serif text-sm text-ivory">
            {sender.names.join(' & ')}
          </p>
          <p className="italic text-champagne/60 text-[0.75rem]">
            And all relatives, friends &amp; well-wishers
          </p>
        </div>

        {/* Back to top */}
        <div className="pt-6 border-t border-champagne/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-champagne/60">
          <p className="flex items-center gap-1.5">
            <span>Celebrating love &amp; togetherness</span>
            <Heart className="h-3 w-3 text-red-400 fill-red-400 inline" />
            <span>21 Nov 2026</span>
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-1.5 text-champagne hover:text-ivory transition-colors cursor-pointer"
          >
            <span className="uppercase tracking-widest text-[0.65rem] font-bold">Back to Top</span>
            <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
