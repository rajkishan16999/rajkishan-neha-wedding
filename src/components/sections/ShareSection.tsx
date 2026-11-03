import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Share2, Check, MessageCircle, Download, QrCode } from 'lucide-react';
import { GoldDivider, FourCorners } from '../ornaments/Ornaments';
import { getSiteUrl } from '../../utils/site';
import { getWhatsAppShareUrl, shareInvitation } from '../../utils/whatsapp';

export function ShareSection() {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied'>('idle');
  const siteUrl = getSiteUrl();
  const whatsappUrl = getWhatsAppShareUrl();

  useEffect(() => {
    const targetUrl = siteUrl || window.location.href;
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#791F2B', // Maroon QR dots
        light: '#FFF9ED', // Ivory background
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error:', err));
  }, [siteUrl]);

  const handleShare = async () => {
    const result = await shareInvitation();
    if (result === 'copied') {
      setCopyFeedback('copied');
      setTimeout(() => setCopyFeedback('idle'), 3000);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `Rajkishan-Neha-Wedding-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="share" className="section-pad relative overflow-hidden bg-paper">
      <div className="container-wedding relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="eyebrow mb-2">Spread The Joy</p>
          <h2 className="heading-display mb-3">Share &amp; Invite</h2>
          <p className="text-deva text-gold-deep text-sm sm:text-base font-semibold">
            ॥ शुभ समाचार साझा करें ॥
          </p>
          <div className="flex justify-center my-4">
            <GoldDivider />
          </div>
          <p className="mx-auto max-w-lg font-serif italic text-base sm:text-lg text-muted">
            Share this invitation with family and loved ones, or scan the QR code to save it on your phone.
          </p>
        </div>

        {/* Share & QR Grid */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Quick Sharing Cards */}
          <div className="card-surface p-7 sm:p-9 relative flex flex-col justify-between border border-gold/40 shadow-sm h-full">
            <FourCorners className="text-gold/30 h-10 w-10 sm:h-12 sm:w-12" inset="inset-2" />

            <div>
              <span className="eyebrow inline-block bg-cream px-3 py-1 rounded-full border border-gold/30 mb-3">
                Digital Invitation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-maroon mb-4">
                Invite Family &amp; Friends
              </h3>
              <p className="text-xs sm:text-sm text-brown/90 leading-relaxed font-sans mb-6">
                Send this wedding invitation card directly via WhatsApp or copy the personal link to share across messaging apps.
              </p>

              <div className="rounded-xl bg-cream/60 p-4 border border-gold/25 mb-8">
                <p className="text-[0.7rem] uppercase tracking-wider text-muted font-bold mb-1">
                  Invitation Link
                </p>
                <p className="font-mono text-xs text-maroon break-all select-all">
                  {siteUrl || (typeof window !== 'undefined' ? window.location.href : 'https://rajkishan-neha.in')}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full !text-xs !min-h-11 shimmer cursor-pointer !bg-[#25D366] !border-[#25D366]/40 hover:!bg-[#1ebc5a]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Share via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="btn btn-outline w-full !text-xs !min-h-11 cursor-pointer"
              >
                {copyFeedback === 'copied' ? (
                  <>
                    <Check className="h-4 w-4 text-green-700" />
                    <span className="text-green-700">Link Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span>Share or Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Card */}
          <div className="card-surface p-7 sm:p-9 relative flex flex-col items-center text-center border border-gold/40 shadow-sm h-full justify-between">
            <FourCorners className="text-gold/30 h-10 w-10 sm:h-12 sm:w-12" inset="inset-2" />

            <div>
              <div className="flex items-center justify-center gap-1.5 text-gold-deep font-sans text-xs font-bold uppercase tracking-widest mb-2">
                <QrCode className="h-4 w-4" />
                <span>Quick Scan</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-maroon mb-2">
                Invitation QR Code
              </h3>
              <p className="text-xs text-muted font-sans mb-6">
                Scan with any phone camera to view this invitation card
              </p>

              {/* QR Container */}
              <div className="mx-auto mb-6 flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-gold/60 bg-ivory p-3 shadow-inner">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Wedding Invitation QR Code"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full animate-pulse bg-cream/50 rounded-lg" />
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadQr}
              className="btn btn-outline !text-xs !min-h-10 cursor-pointer"
              title="Download high-resolution QR image"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download QR Code</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
