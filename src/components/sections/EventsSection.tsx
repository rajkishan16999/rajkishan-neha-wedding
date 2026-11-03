import { Calendar, Clock, Sparkles } from 'lucide-react';
import { weddingConfig, type WeddingEvent } from '../../config/weddingConfig';
import { GoldDivider } from '../ornaments/Ornaments';
import { formatLongDate } from '../../utils/date';
import { getGoogleCalendarUrl } from '../../utils/calendar';

import mehendiImg from '../../assets/illustrations/mehendi.webp';
import mandapImg from '../../assets/illustrations/mandap.webp';
import vidaaiImg from '../../assets/illustrations/vidaai.webp';

const illustrations: Record<string, string> = {
  mehendi: mehendiImg,
  mandap: mandapImg,
  vidaai: vidaaiImg,
};

export function EventsSection() {
  const { events } = weddingConfig;

  return (
    <section id="events" className="section-pad relative overflow-hidden bg-cream-paper">
      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="eyebrow mb-2">Celebration Itinerary</p>
          <h2 className="heading-display mb-3">Wedding Events</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base font-semibold">
            ॥ मांगल्य उत्सव कार्यक्रम ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
          <p className="mx-auto max-w-xl font-serif italic text-base sm:text-lg text-muted">
            Join us for three joyous days of music, sacred rituals, laughter, and timeless celebrations.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {events.map((event: WeddingEvent) => {
            const calendarUrl = getGoogleCalendarUrl(event);
            const imageSrc = illustrations[event.illustration];
            const isMainEvent = event.id === 'wedding-ceremony';

            return (
              <div
                key={event.id}
                className={`card-surface relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  isMainEvent
                    ? 'border-gold shadow-md ring-1 ring-gold/40'
                    : 'border-gold/30 hover:border-gold/70'
                }`}
              >
                {/* Event artwork header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-ivory/50 p-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-transparent via-gold/5 to-gold/15" />
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={event.illustrationAlt}
                      className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  {isMainEvent && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-maroon px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ivory shadow-xs">
                      <Sparkles className="h-3 w-3 text-champagne" />
                      <span>Main Ceremony</span>
                    </div>
                  )}
                </div>

                {/* Event Card Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Hindi & English Titles */}
                    {event.hindiTitle && (
                      <p className="text-deva text-xs font-semibold text-gold-deep mb-1">
                        {event.hindiTitle}
                      </p>
                    )}
                    <h3 className="font-serif text-2xl font-bold tracking-wide text-maroon mb-3">
                      {event.title}
                    </h3>

                    {/* Date and Time badge */}
                    <div className="space-y-1.5 mb-4 rounded-xl bg-cream/50 p-3 border border-gold/25 text-xs">
                      <div className="flex items-center gap-2 text-brown font-medium">
                        <Calendar className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                        <span>{formatLongDate(event.date)}</span>
                      </div>
                      {event.timeLabel && (
                        <div className="flex items-center gap-2 text-brown font-medium">
                          <Clock className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                          <span>{event.timeLabel}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-brown/90 leading-relaxed mb-6 font-sans">
                      {event.description}
                    </p>
                  </div>

                  {/* Add to Calendar Button */}
                  <div>
                    <a
                      href={calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline w-full !text-xs !min-h-10 cursor-pointer"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Add to Calendar</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
