import { useState, useEffect } from 'react';
import { Menu, X, Share2, Calendar } from 'lucide-react';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import { weddingConfig } from '../../config/weddingConfig';
import { getGoogleCalendarUrl } from '../../utils/calendar';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'couple', label: 'Couple' },
  { id: 'invitation', label: 'Invitation' },
  { id: 'events', label: 'Events' },
  { id: 'venue', label: 'Venue' },
  { id: 'live', label: 'Live Stream' },
  { id: 'share', label: 'Share' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const weddingEvent = weddingConfig.events.find((e) => e.id === 'wedding-ceremony') ?? weddingConfig.events[0];
  const calendarUrl = weddingEvent ? getGoogleCalendarUrl(weddingEvent) : '#';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/90 shadow-md backdrop-blur-md border-b border-gold/20 py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="container-wedding flex items-center justify-between">
        {/* Monogram / Brand */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2 text-left cursor-pointer transition-transform active:scale-95"
          aria-label="Back to top"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-ivory/95 font-serif text-lg font-bold text-maroon shadow-sm transition-all duration-300 group-hover:border-gold group-hover:bg-cream">
            R<span className="text-gold-deep text-sm font-sans">&amp;</span>N
          </div>
          <div className="hidden sm:block">
            <span className="block font-serif text-sm font-semibold tracking-wider text-maroon uppercase">
              {weddingConfig.groom.firstName} &amp; {weddingConfig.bride.firstName}
            </span>
            <span className="block text-[0.65rem] tracking-widest text-gold-deep uppercase">
              21 November 2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-maroon text-ivory shadow-sm'
                    : 'text-brown hover:bg-gold/15 hover:text-maroon'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-cream/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-maroon transition-all duration-300 hover:border-gold hover:bg-gold/20"
            title="Add Wedding Ceremony to Google Calendar"
          >
            <Calendar className="h-3.5 w-3.5 text-gold-deep" />
            <span>Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => handleNavClick('share')}
            className="btn btn-primary !min-h-9 !py-1.5 !px-3.5 sm:!px-4 !text-[0.7rem] cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Invite</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-maroon cursor-pointer hover:bg-gold/10"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full border-b border-gold/30 bg-ivory/95 px-6 py-6 shadow-xl backdrop-blur-lg transition-all animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left font-sans text-sm font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-maroon text-ivory'
                      : 'text-brown hover:bg-gold/15 hover:text-maroon'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-champagne" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
