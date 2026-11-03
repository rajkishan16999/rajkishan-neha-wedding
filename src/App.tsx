import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { CoupleSection } from './components/sections/CoupleSection';
import { InvitationSection } from './components/sections/InvitationSection';
import { EventsSection } from './components/sections/EventsSection';
import { VenueSection } from './components/sections/VenueSection';
import { LiveStreamSection } from './components/sections/LiveStreamSection';
import { ShareSection } from './components/sections/ShareSection';
import { Footer } from './components/layout/Footer';
import { Petals } from './components/common/Petals';
import { MusicPlayer } from './components/common/MusicPlayer';

export function App() {
  return (
    <div className="relative min-h-screen bg-paper text-brown selection:bg-gold/30 selection:text-wine">
      {/* Ambient Flower Petals */}
      <Petals />

      {/* Floating / Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection />
        <CoupleSection />
        <InvitationSection />
        <EventsSection />
        <VenueSection />
        <LiveStreamSection />
        <ShareSection />
      </main>

      {/* Royal Footer */}
      <Footer />

      {/* Background Music Player (if audio configured) */}
      <MusicPlayer />
    </div>
  );
}

export default App;
