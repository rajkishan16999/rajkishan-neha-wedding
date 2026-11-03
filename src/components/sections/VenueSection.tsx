import { MapPin, Navigation, ExternalLink, Building2 } from 'lucide-react';
import { weddingConfig } from '../../config/weddingConfig';
import { GoldDivider, FourCorners } from '../ornaments/Ornaments';
import { getMapsOpenUrl, getDirectionsUrl, getMapsEmbedUrl } from '../../utils/maps';

export function VenueSection() {
  const { venue } = weddingConfig;
  const mapsOpenUrl = getMapsOpenUrl();
  const directionsUrl = getDirectionsUrl();
  const embedUrl = getMapsEmbedUrl();

  return (
    <section id="venue" className="section-pad relative overflow-hidden bg-paper">
      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="eyebrow mb-2">Location &amp; Travel</p>
          <h2 className="heading-display mb-3">Venue &amp; Directions</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base font-semibold">
            ॥ विवाह स्थल एवं मार्ग दर्शन ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
          <p className="mx-auto max-w-lg font-serif italic text-base sm:text-lg text-muted">
            We eagerly await your arrival to celebrate this auspicious milestone with us.
          </p>
        </div>

        {/* Venue Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Details Card */}
          <div className="lg:col-span-5 card-surface p-7 sm:p-9 relative flex flex-col justify-between border border-gold/40 shadow-sm">
            <FourCorners className="text-gold/30 h-10 w-10 sm:h-12 sm:w-12" inset="inset-2" />
            
            <div>
              <div className="flex items-center gap-2 text-gold-deep font-sans text-xs font-bold uppercase tracking-widest mb-2">
                <Building2 className="h-4 w-4" />
                <span>Wedding Destination</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-maroon mb-2">
                {venue.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-6">
                ({venue.googleListingName})
              </p>

              {/* Address */}
              <div className="rounded-xl bg-cream/50 p-4 border border-gold/20 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold-deep shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-brown space-y-0.5 leading-relaxed">
                    {venue.addressLines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    <p className="font-semibold text-maroon">{venue.city}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted mb-8 font-sans leading-relaxed">
                Ample valet parking and convenient access from Raebareli railway station and major transit hubs.
              </p>
            </div>

            {/* Navigation CTAs */}
            <div className="space-y-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full !text-xs !min-h-11 shimmer cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Driving Directions</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={mapsOpenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline !text-[0.7rem] !min-h-10 !px-2 cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={venue.hotelWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline !text-[0.7rem] !min-h-10 !px-2 cursor-pointer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Hotel Web</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-gold/50 shadow-md relative bg-cream/40">
            <iframe
              title={`Map showing location of ${venue.name}`}
              src={embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={`Interactive map of ${venue.name}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

