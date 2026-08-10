import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Video as VideoIcon, Calendar, Maximize2, X } from 'lucide-react';

const stripEmojis = (str) => {
  if (!str) return '';
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1F004}-\u{1F0CF}]/gu;
  return str.replace(emojiRegex, '').replace(/  +/g, ' ').trim();
};

const formatMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if ((url.startsWith('http://') || url.startsWith('https://')) && !url.includes('/api/proxy-media')) {
    return `/api/proxy-media?url=${encodeURIComponent(url)}`;
  }
  return url;
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

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + works.length) % works.length);
  };

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % works.length);
  };

  if (works.length === 0) return null;

  const currentWork = works[currentIndex] || works[0];
  const mediaList = currentWork.mediaList && currentWork.mediaList.length > 0
    ? currentWork.mediaList.map(m => ({ ...m, url: formatMediaUrl(m.url) }))
    : (currentWork.images && currentWork.images.length > 0 ? currentWork.images.map(url => ({ type: 'image', url: formatMediaUrl(url) })) : [{ type: 'image', url: formatMediaUrl(currentWork.image) }]);

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
              <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Жива галерея Telegram
              </span>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '24px', fontWeight: 700, color: 'var(--bg-navy)', margin: '4px 0 0' }}>
                Останні виконані замовлення
              </h2>
            </div>

            <button
              onClick={onGoToPortfolio}
              style={{
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: 0,
                border: '1.5px solid #cbd5e1',
                background: '#ffffff',
                color: 'var(--bg-navy)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s'
              }}
            >
              Дивитися всі мої роботи <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            position: 'relative',
            borderRadius: 0,
            overflow: 'hidden',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            minHeight: '270px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div
              onClick={() => setFullscreenMedia(mediaItem.url)}
              style={{
                height: '270px',
                position: 'relative',
                overflow: 'hidden',
                background: '#f1f5f9',
                cursor: 'pointer',
                borderRadius: 0
              }}
              title="Натисніть, щоб відкрити на весь екран"
            >
              {isVideo ? (
                <video
                  src={mediaItem.url}
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
                />
              ) : (
                <img
                  src={mediaItem.url}
                  alt={titleText}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', borderRadius: 0 }}
                />
              )}

              {currentWork.date && (
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.92)', color: '#0b172a', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {currentWork.date}
                </span>
              )}

              {isVideo && (
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--accent-gold)', color: '#0b172a', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <VideoIcon size={12} /> Відео
                </span>
              )}

              <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(11,23,42,0.75)', color: '#ffffff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Maximize2 size={11} /> На весь екран
              </span>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Робота {currentIndex + 1} з {works.length}
                </span>
                <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '19px', fontWeight: 700, margin: '6px 0 10px', lineHeight: 1.35, color: '#0b172a' }}>
                  {titleText}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {descText}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {works.slice(0, 8).map((_, idx) => (
                    <span
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        width: idx === currentIndex ? '22px' : '8px',
                        height: '8px',
                        borderRadius: 0,
                        background: idx === currentIndex ? 'var(--accent-gold)' : '#cbd5e1',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={onGoToPortfolio}
                  style={{ background: 'transparent', border: 'none', color: 'var(--accent-gold)', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Переглянути в галереї &raquo;
                </button>
              </div>
            </div>

            {works.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
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
                    margin: 0,
                    lineHeight: 0,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                    zIndex: 4
                  }}
                >
                  <ChevronLeft size={20} style={{ display: 'block', margin: 'auto', transform: 'translateX(-1px)' }} />
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
                    margin: 0,
                    lineHeight: 0,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                    zIndex: 4
                  }}
                >
                  <ChevronRight size={20} style={{ display: 'block', margin: 'auto', transform: 'translateX(1px)' }} />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {fullscreenMedia && (
        <div
          onClick={() => setFullscreenMedia(null)}
          style={{
            position: 'fixed',
            inset: 0,
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
                style={{ maxWidth: '92vw', maxHeight: '85vh', borderRadius: 0, boxShadow: '0 25px 60px rgba(0,0,0,0.6)', objectFit: 'contain' }}
              />
            ) : (
              <img
                src={fullscreenMedia}
                alt="Full screen work preview"
                style={{ maxWidth: '92vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 0, boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
