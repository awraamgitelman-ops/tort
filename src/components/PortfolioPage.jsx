import React, { useEffect, useState } from 'react';
import { Sparkles, Send, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon, PlayCircle, Video as VideoIcon, Maximize2, X } from 'lucide-react';

function WorkCard({ work, onAddToCart, onOpenFullscreen }) {
  // Support both mediaList (with types) and images array
  const mediaItems = work.mediaList && work.mediaList.length > 0 
    ? work.mediaList 
    : (work.images && work.images.length > 0 ? work.images.map(url => ({ type: 'image', url })) : [{ type: 'image', url: work.image }]);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const nextMedia = (e) => {
    e.stopPropagation();
    setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const isCurrentVideo = currentMedia?.type === 'video' || (typeof currentMedia?.url === 'string' && (currentMedia.url.endsWith('.mp4') || currentMedia.url.includes('video')));

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s'
      }}
    >
      {/* Media Box with Video Player & Carousel Navigation */}
      <div
        onClick={() => onOpenFullscreen(currentMedia.url)}
        style={{ width: '100%', height: '270px', overflow: 'hidden', position: 'relative', background: '#0b172a', cursor: 'pointer' }}
        title="Натисніть, щоб відкрити на весь екран"
      >
        {isCurrentVideo ? (
          <video
            src={currentMedia.url}
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
        ) : (
          <img
            src={currentMedia.url}
            alt={work.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s' }}
          />
        )}

        {/* Multi-media counter badge */}
        {mediaItems.length > 1 && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(11,23,42,0.85)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2
          }}>
            {isCurrentVideo ? <VideoIcon size={12} /> : <ImageIcon size={12} />}
            {activeMediaIndex + 1} / {mediaItems.length} {isCurrentVideo ? 'відео' : 'медіа'}
          </span>
        )}

        {/* Real Channel Date badge */}
        {work.date && (
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(11,23,42,0.85)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 2
          }}>
            <Calendar size={12} /> {work.date}
          </span>
        )}

        {/* Click to Expand Badge */}
        <span style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(11,23,42,0.8)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: '10px',
          fontSize: '10.5px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2
        }}>
          <Maximize2 size={11} /> На весь екран
        </span>

        {/* Carousel Prev/Next Navigation Controls if > 1 media item */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.92)',
                color: '#0b172a',
                border: '1px solid #cbd5e1',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                padding: 0,
                lineHeight: 0,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                zIndex: 3
              }}
            >
              <ChevronLeft size={18} style={{ display: 'block', margin: 'auto' }} />
            </button>

            <button
              onClick={nextMedia}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.92)',
                color: '#0b172a',
                border: '1px solid #cbd5e1',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                padding: 0,
                lineHeight: 0,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                zIndex: 3
              }}
            >
              <ChevronRight size={18} style={{ display: 'block', margin: 'auto' }} />
            </button>
          </>
        )}
      </div>

      {/* Mini Thumbnails Strip if Album */}
      {mediaItems.length > 1 && (
        <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: '#f8fafc', overflowX: 'auto', borderBottom: '1px solid #e2e8f0' }}>
          {mediaItems.map((item, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMediaIndex(idx);
              }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                border: activeMediaIndex === idx ? '2px solid var(--accent-gold)' : '1px solid #cbd5e1',
                opacity: activeMediaIndex === idx ? 1 : 0.65,
                background: '#0b172a',
                flexShrink: 0
              }}
            >
              {item.type === 'video' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <PlayCircle size={20} />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt="thumbnail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Card Content Description */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '18px', color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
          {work.title}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px', flex: 1, whiteSpace: 'pre-line' }}>
          {work.description}
        </p>

        <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '14px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            className="btn-primary"
            onClick={() => onAddToCart({
              id: `portfolio-${work.id}`,
              name: work.title,
              price: 1100,
              unit: 'грн/кг',
              img: work.image,
              desc: work.description
            })}
            style={{ fontSize: '12.5px', padding: '8px 16px' }}
          >
            Замовити схожий десерт
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage({ onAddToCart }) {
  const isTargetPost = (item) => {
    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    return title.includes('скеля') || desc.includes('скеля') ||
           title.includes('стильні чоловічі торти') || desc.includes('стильні чоловічі торти');
  };

  const [works, setWorks] = useState(() => {
    try {
      const cached = localStorage.getItem('cached_portfolio_works');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.filter(item => !isTargetPost(item));
      }
      return [];
    } catch (e) {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const cachedRaw = localStorage.getItem('cached_portfolio_works');
      let cachedWorks = [];
      if (cachedRaw) {
        try {
          const parsed = JSON.parse(cachedRaw);
          cachedWorks = parsed.filter(item => !isTargetPost(item));
        } catch (e) {}
      }

      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        const filteredServer = Array.isArray(data) ? data.filter(item => !isTargetPost(item)) : [];

        if (filteredServer.length > 0) {
          const sorted = [...filteredServer].sort((a, b) => {
            const timeA = Number(a.originalTimestamp || a.id) || 0;
            const timeB = Number(b.originalTimestamp || b.id) || 0;
            return timeB - timeA;
          });
          localStorage.setItem('cached_portfolio_works', JSON.stringify(sorted));
          setWorks(sorted);
        } else if (cachedWorks.length > 0) {
          // Server container restarted/redeployed -> auto-restore from client cache & sync to server!
          setWorks(cachedWorks);
          fetch('/api/portfolio/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ works: cachedWorks })
          }).catch(() => {});
        } else {
          setWorks([]);
        }
      }
    } catch (err) {
      console.warn('Failed to load portfolio:', err);
      const cachedRaw = localStorage.getItem('cached_portfolio_works');
      if (cachedRaw) {
        try {
          const parsed = JSON.parse(cachedRaw);
          setWorks(parsed.filter(item => !isTargetPost(item)));
        } catch (e) {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div style={{ minHeight: '80vh', padding: '36px 0 80px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header Mint Banner */}
        <div className="hero-banner" style={{ borderRadius: 'var(--radius-md)', padding: '24px 36px', marginBottom: '32px' }}>
          <div className="hero-banner-content">
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                Офіційна портфоліо-галерея
              </span>
              <h1 className="hero-banner-title" style={{ fontSize: '36px', marginTop: '4px' }}>
                Мої Роботи & Авторські Десерти
              </h1>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '16px', fontWeight: 600 }}>Завантаження робіт та відео-оглядів...</p>
          </div>
        ) : works.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', padding: '48px 24px', textAlign: 'center' }}>
            <Sparkles size={48} style={{ color: 'var(--accent-gold)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Галерея робіт наразі порожня
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 16px' }}>
              Пересилайте фотографії або відео-огляди десертів у Telegram-бот <code>@BELLA_CREME_ua</code>, і вони миттєво з'являться тут з вбудованим відеоплеєром!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {works.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onAddToCart={onAddToCart}
                onOpenFullscreen={(mediaUrl) => setFullscreenMedia(mediaUrl)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Centered Fullscreen Lightbox Modal */}
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
            background: 'rgba(11, 23, 42, 0.94)',
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
    </div>
  );
}
