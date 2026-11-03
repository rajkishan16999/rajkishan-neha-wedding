import { Home, HeartHandshake } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { Kalash, HangingBell, GoldDivider, FourCorners } from '../ornaments/Ornaments';

export function InvitationSection() {
  const { messages, sender, groom, bride, wedding } = weddingConfig;

  return (
    <section id="invitation" className="section-pad relative overflow-hidden bg-paper">
      {/* Decorative swinging bells on large screens */}
      <div className="hidden lg:block absolute top-8 left-12 z-10 pointer-events-none opacity-40">
        <HangingBell className="h-44 w-12" />
      </div>
      <div className="hidden lg:block absolute top-8 right-12 z-10 pointer-events-none opacity-40">
        <HangingBell className="h-44 w-12" />
      </div>

      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">Sacred Invitation</p>
          <h2 className="heading-display mb-3">Cordially Invited</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base font-semibold">
            ॥ शुभ निमंत्रण ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
        </div>

        {/* Grand Wedding Card Container */}
        <div className="mx-auto max-w-3xl gold-frame rounded-3xl bg-ivory/95 p-8 sm:p-12 md:p-16 text-center shadow-xl">
          <FourCorners className="text-gold h-14 w-14 sm:h-20 sm:w-20" inset="inset-3 sm:inset-4" />

          {/* Kalash Symbol */}
          <div className="mx-auto mb-6 flex justify-center">
            <Kalash className="h-20 sm:h-24 text-gold-deep" />
          </div>

          {/* Blessing Header */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-gold-deep mb-4">
            {messages.invitationBlessing}
          </p>

          <p className="mx-auto max-w-xl font-sans text-sm sm:text-base text-brown leading-relaxed mb-6">
            {messages.invitationIntro}
          </p>

          {/* Names in wedding card typography */}
          <div className="my-8 py-6 border-y border-gold/30 bg-cream/40 rounded-2xl">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-wider text-maroon uppercase mb-2">
              {groom.fullName}
            </h3>
            <p className="font-serif italic text-lg sm:text-xl text-gold-deep my-1">
              weds
            </p>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-wider text-maroon uppercase">
              {bride.fullName}
            </h3>
            <p className="mt-4 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-muted">
              On {wedding.displayDate} · {wedding.displayTime} onwards
            </p>
          </div>

          {/* Closing message */}
          <p className="mx-auto max-w-xl font-serif italic text-base sm:text-lg text-brown leading-relaxed mb-8">
            "{messages.invitationClosing}"
          </p>

          <div className="flex justify-center my-6">
            <GoldDivider className="w-36 sm:w-48" />
          </div>

          {/* Host / Sender details */}
          <div className="mt-8 rounded-2xl bg-cream/50 p-6 border border-gold/30 text-left sm:text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-gold-deep font-sans text-xs font-bold uppercase tracking-widest">
              <HeartHandshake className="h-4 w-4" />
              <span>Solicited By · निमंत्रक</span>
            </div>
            
            <p className="font-serif text-lg sm:text-xl font-bold text-maroon">
              {sender.names.join(' & ')}
            </p>
            <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-4">
              ({sender.relation})
            </p>

            <div className="inline-flex items-start sm:items-center justify-center gap-2 text-xs text-brown/90 border-t border-gold/20 pt-3">
              <Home className="h-4 w-4 text-gold-deep shrink-0 mt-0.5 sm:mt-0" />
              <span>
                {sender.addressLines.join(' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
