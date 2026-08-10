import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Video as VideoIcon, Calendar, Maximize2, X } from 'lucide-react';

const stripEmojis = (str) => {
  if (!str) return '';
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1F004}-\u{1F0CF}]/gu;
  return str.replace(emojiRegex, '').replace(/  +/g, ' ').trim();
};

export default function PortfolioCarousel({ onGoToPortfolio }) {
  const [works, setWorks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          const filtered = Array.isArray(data) ? data.filter(item => {
            const t = (item.title || '').toLowerCase();
            const d = (item.description || '').toLowerCase();
            return !t.includes('скеля') && !d.includes('скеля') && !t.includes('стильні чоловічі торти') && !d.includes('стильні чоловічі торти');
          }) : [];
          if (filtered.length > 0) {
            const sorted = [...filtered].sort((a, b) => (Number(b.originalTimestamp || b.id) || 0) - (Number(a.originalTimestamp || a.id) || 0));
            setWorks(sorted);
          }
        }
      } catch (err) { console.warn(err); }
    };
    fetchWorks();
  }, []);

  useEffect(() => {
    if (works.length <= 1 || fullscreenMedia) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % works.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [works.length, fullscreenMedia]);

  if (works.length === 0) return null;

  const currentWork = works[currentIndex] || works[0];
  const mediaList = currentWork.mediaList && currentWork.mediaList.length > 0
    ? currentWork.mediaList
    : (currentWork.images && currentWork.images.length > 0 ? currentWork.images.map(url => ({ type: 'image', url })) : [{ type: 'image', url: currentWork.image }]);

  const mediaItem = mediaList[0] || {};
  const isVideo = mediaItem.type === 'video' || (typeof mediaItem.url === 'string' && (mediaItem.url.endsWith('.mp4') || mediaItem.url.includes('video')));

  const titleText = stripEmojis(currentWork.title);
  const descText = stripEmojis(currentWork.description);

  return (
    <>
      <section style={{ margin: '40px 0', background: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.96)',
                  color: '#0b172a',
                  border: '1px solid #cbd5e1',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  padding: 0,
                  lineHeight: 0,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  zIndex: 4
                }}
              >
                <ChevronLeft size={20} style={{ display: 'block', margin: 'auto' }} />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.96)',
                  color: '#0b172a',
                  border: '1px solid #cbd5e1',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  padding: 0,
                  lineHeight: 0,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  zIndex: 4
                }}
              >
                <ChevronRight size={20} style={{ display: 'block', margin: 'auto' }} />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal (Centered) */}
      {fullscreenMedia && (
        <div
          onClick={() => setFullscreenMedia(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            background: 'rgba(11, 23, 42, 0.93)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <button
            onClick={() => setFullscreenMedia(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.25)',
              color: '#ffffff',
              border: 'none',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: 0,
              margin: 0,
              lineHeight: 0,
              cursor: 'pointer',
              zIndex: 1000000
            }}
          >
            <X size={26} style={{ display: 'block', margin: 'auto' }} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              maxWidth: '92vw',
              maxHeight: '90vh',
              margin: 'auto'
            }}
          >
            {fullscreenMedia.endsWith('.mp4') || fullscreenMedia.includes('video') ? (
              <video
                src={fullscreenMedia}
                controls
                autoPlay
                style={{ maxWidth: '92vw', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)', objectFit: 'contain' }}
              />
            ) : (
              <img
                src={fullscreenMedia}
                alt="Full screen work preview"
                style={{ maxWidth: '92vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
