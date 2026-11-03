import { Heart, Briefcase, Users } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { GoldDivider, Lotus, FourCorners } from '../ornaments/Ornaments';

export function CoupleSection() {
  const { groom, bride } = weddingConfig;

  return (
    <section id="couple" className="section-pad relative overflow-hidden bg-cream-paper">
      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="eyebrow mb-2">Blessed Union</p>
          <h2 className="heading-display mb-3">The Happy Couple</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base mb-3 font-semibold">
            ॥ वर एवं वधू ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
          <p className="mx-auto max-w-lg font-serif italic text-base sm:text-lg text-muted">
            Two lives, two souls, united in love and sacred bonds of togetherness.
          </p>
        </div>

        {/* Couple Cards Grid */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative items-stretch">
          {/* Groom Card */}
          <div className="card-surface relative p-7 sm:p-9 flex flex-col justify-between border border-gold/40 hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md">
            <FourCorners className="text-gold/30 h-10 w-10 sm:h-14 sm:w-14" inset="inset-2" />
            
            <div>
              <div className="text-center mb-6">
                <span className="eyebrow inline-block bg-cream px-3 py-1 rounded-full border border-gold/30 mb-2">
                  The Groom · वर
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-maroon">
                  {groom.fullName}
                </h3>
              </div>

              {/* Professional */}
              <div className="mb-6 rounded-xl bg-ivory/60 p-4 border border-gold/20">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brown">
                      {groom.designation}
                    </p>
                    <p className="text-xs text-muted font-sans">
                      {groom.organisation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Family Lineage */}
              <div className="space-y-3 border-t border-gold/20 pt-4">
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="text-brown">
                      <span className="font-semibold text-muted">Grandson of: </span>
                      {groom.grandfather}
                    </p>
                    <p className="text-brown">
                      <span className="font-semibold text-muted">Son of: </span>
                      {groom.father} &amp; {groom.mother}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Lotus className="h-5 text-gold-deep/60" />
            </div>
          </div>

          {/* Central Heart Badge for Desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory text-maroon shadow-md">
            <Heart className="h-5 w-5 text-maroon fill-maroon/20" />
          </div>

          {/* Bride Card */}
          <div className="card-surface relative p-7 sm:p-9 flex flex-col justify-between border border-gold/40 hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md">
            <FourCorners className="text-gold/30 h-10 w-10 sm:h-14 sm:w-14" inset="inset-2" />

            <div>
              <div className="text-center mb-6">
                <span className="eyebrow inline-block bg-cream px-3 py-1 rounded-full border border-gold/30 mb-2">
                  The Bride · वधू
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-maroon">
                  {bride.fullName}
                </h3>
              </div>

              {/* Blessing quote / Grace */}
              <div className="mb-6 rounded-xl bg-ivory/60 p-4 border border-gold/20 text-center">
                <p className="font-serif italic text-sm text-brown leading-relaxed">
                  "A daughter filled with grace, warmth and auspicious virtues, stepping into a lifetime of love and joy."
                </p>
              </div>

              {/* Family Lineage */}
              <div className="space-y-3 border-t border-gold/20 pt-4">
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-gold-deep shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="text-brown">
                      <span className="font-semibold text-muted">Daughter of: </span>
                      {bride.father} &amp; {bride.mother}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Lotus className="h-5 text-gold-deep/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
