import { Calendar, ChevronDown, MapPin } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { Mandala, GoldDivider } from '../ornaments/Ornaments';
import { CountdownTimer } from '../common/CountdownTimer';
import { getGoogleCalendarUrl } from '../../utils/calendar';
import { scrollToSection } from '../../hooks/useActiveSection';
import ganeshaImg from '../../assets/illustrations/ganesha.webp';

export function HeroSection() {
  const { invocation, messages, groom, bride, wedding, venue } = weddingConfig;
  const weddingCeremonyEvent = weddingConfig.events.find((e) => e.id === 'wedding-ceremony') ?? weddingConfig.events[0];
  const calendarUrl = weddingCeremonyEvent ? getGoogleCalendarUrl(weddingCeremonyEvent) : '#';

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[480px] w-[480px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <div className="container-wedding relative z-20 text-center">
        {/* Sanskrit Invocation */}
        <div className="mb-6 inline-block">
          <p className="text-deva text-xs sm:text-sm md:text-base font-semibold tracking-wide text-maroon/90 bg-cream/70 border border-gold/40 rounded-full px-5 py-2 shadow-xs backdrop-blur-xs">
            {invocation}
          </p>
        </div>

        {/* Ganesha Artwork with Rotating Mandala */}
        <div className="relative mx-auto mb-6 flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center">
          <Mandala className="absolute inset-0 h-full w-full text-gold/35 animate-spin-slow" />
          <img
            src={ganeshaImg}
            alt="Lord Ganesha"
            className="relative z-10 h-24 w-24 sm:h-28 sm:w-28 object-contain drop-shadow-md"
            loading="eager"
            width={120}
            height={120}
          />
        </div>

        {/* Eyebrow */}
        <p className="eyebrow mb-3">{messages.heroEyebrow}</p>

        {/* Couple Names */}
        <h1 className="heading-display mb-4 text-maroon">
          <span className="block sm:inline">{groom.firstName}</span>
          <span className="mx-2 sm:mx-4 font-serif font-light text-gold-deep italic">&amp;</span>
          <span className="block sm:inline">{bride.firstName}</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-xl font-serif text-lg sm:text-xl md:text-2xl italic text-muted mb-6">
          "{messages.heroSubtitle}"
        </p>

        {/* Gold Ornamental Divider */}
        <div className="flex justify-center my-6">
          <GoldDivider />
        </div>

        {/* Date & Venue highlights */}
        <div className="mx-auto mb-10 max-w-lg space-y-1">
          <p className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-maroon">
            {wedding.displayDate}
          </p>
          <p className="flex items-center justify-center gap-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-gold-deep">
            <MapPin className="h-4 w-4" />
            <span>{venue.name}, {venue.city}</span>
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10">
          <p className="eyebrow mb-4 !text-[0.68rem]">Auspicious Muhurat Countdown</p>
          <CountdownTimer />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary shimmer cursor-pointer"
          >
            <Calendar className="h-4 w-4" />
            <span>Add to Calendar</span>
          </a>
          <button
            type="button"
            onClick={() => scrollToSection('events')}
            className="btn btn-outline cursor-pointer"
          >
            <span>View Events</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('venue')}
            className="btn btn-outline cursor-pointer"
          >
            <MapPin className="h-4 w-4" />
            <span>Venue</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('couple')}
            aria-label="Scroll to couple section"
            className="group flex flex-col items-center gap-1 text-gold-deep/70 transition-colors hover:text-maroon cursor-pointer"
          >
            <span className="text-[0.65rem] uppercase tracking-widest font-bold">Scroll Down</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
