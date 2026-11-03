import { Tv, ExternalLink, Calendar, Bell } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { GoldDivider, FourCorners } from '../ornaments/Ornaments';
import { getLiveStreamSource } from '../../utils/youtube';
import { getGoogleCalendarUrl } from '../../utils/calendar';

export function LiveStreamSection() {
  const { messages, wedding } = weddingConfig;
  const source = getLiveStreamSource();
  const weddingEvent = weddingConfig.events.find((e) => e.id === 'wedding-ceremony') ?? weddingConfig.events[0];
  const calendarUrl = weddingEvent ? getGoogleCalendarUrl(weddingEvent) : '#';

  return (
    <section id="live" className="section-pad relative overflow-hidden bg-cream-paper">
      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="eyebrow mb-2">Virtual Attendance</p>
          <h2 className="heading-display mb-3">Live Broadcast</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base font-semibold">
            ॥ सजीव प्रसारण ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
          <p className="mx-auto max-w-xl font-serif text-lg sm:text-xl italic text-maroon mb-2">
            "{messages.liveTitle}"
          </p>
          <p className="mx-auto max-w-lg font-sans text-xs sm:text-sm text-muted">
            {messages.liveSubtitle}
          </p>
        </div>

        {/* Stream Box */}
        <div className="mx-auto max-w-3xl">
          {source.kind !== 'none' ? (
            <div className="card-surface p-4 sm:p-6 border border-gold/50 shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-brown/90 shadow-inner">
                <iframe
                  src={source.embedUrl}
                  title="Wedding Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
                <div>
                  <p className="font-serif font-bold text-maroon text-lg">Live Ceremony Stream</p>
                  <p className="text-xs text-muted">Streaming live from Shanti Grand Hotel, Raebareli</p>
                </div>
                <a
                  href={source.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !text-xs !min-h-10 cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="card-surface p-8 sm:p-12 relative text-center border border-gold/40 shadow-md">
              <FourCorners className="text-gold/30 h-10 w-10 sm:h-14 sm:w-14" inset="inset-2" />

              <div className="mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-cream border border-gold/50 text-maroon shadow-sm">
                <Tv className="h-8 w-8 sm:h-10 sm:w-10 text-maroon" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon mb-3">
                Live Broadcast Coming Soon
              </h3>

              <p className="mx-auto max-w-md font-sans text-xs sm:text-sm text-brown leading-relaxed mb-6">
                The live video feed will go live here on{' '}
                <strong className="text-maroon">{wedding.displayDate}</strong> at{' '}
                <strong className="text-maroon">{wedding.displayTime} IST</strong>.
                Guests who are unable to travel in person can tune in and share their blessings in real-time.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold text-gold-deep border border-gold/30 mb-8">
                <Bell className="h-3.5 w-3.5" />
                <span>Bookmark this page to watch on the wedding day</span>
              </div>

              <div className="flex justify-center">
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Add Reminder to Calendar</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
