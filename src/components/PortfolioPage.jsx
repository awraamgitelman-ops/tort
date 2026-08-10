import React, { useEffect, useState } from 'react';
import {
  Sparkles, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon,
  PlayCircle, Video as VideoIcon, Maximize2, X, ShoppingBag
} from 'lucide-react';

const stripEmojis = (str) => {
  if (!str) return '';
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1F004}-\u{1F0CF}]/gu;
  return str
    .replace(emojiRegex, '')
    .replace(/@BELLA_CREME_Meneger/gi, '@BELLA_CREME_Manager')
    .replace(/@BELLA_CREME_ua/gi, '@BELLA_CREME_Manager')
    .replace(/  +/g, ' ')
    .trim();
};

const formatMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if ((url.startsWith('http://') || url.startsWith('https://')) && !url.includes('/api/proxy-media')) {
    return `/api/proxy-media?url=${encodeURIComponent(url)}`;
  }
  return url;
};

const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\bhttps?:\/\/[^\s]+|@[a-zA-Z0-9_]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline', fontWeight: 600 }}>
          {part}
        </a>
      );
    }
    if (part.startsWith('@')) {
      const username = part.replace('@', '');
      return (
        <a key={i} href={`https://t.me/${username}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline', fontWeight: 600 }}>
          {part}
        </a>
      );
    }
    return part;
  });
};

/* PURE PHOTO RECTANGLE CARD */
function WorkCardCompact({ work, onOpenDetail }) {
  const mediaItems = work.mediaList && work.mediaList.length > 0
    ? work.mediaList.map(m => ({ ...m, url: formatMediaUrl(m.url) }))
    : (work.images && work.images.length > 0 ? work.images.map(url => ({ type: 'image', url: formatMediaUrl(url) })) : [{ type: 'image', url: formatMediaUrl(work.image) }]);
  const mainMedia = mediaItems[0] || {};
  const isVideo = mainMedia?.type === 'video' || (typeof mainMedia?.url === 'string' && (mainMedia.url.endsWith('.mp4') || mainMedia.url.includes('video')));

  return (
    <article
      onClick={() => onOpenDetail(work)}
      style={{
        background: '#0b172a',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        height: '280px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
      className="portfolio-photo-card"
    >
      {isVideo ? (
        <video src={mainMedia.url} muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }} />
      ) : (
        <img src={mainMedia.url || work.image} alt={stripEmojis(work.title)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, transition: 'transform 0.3s ease' }} />
      )}

      {work.date && (
        <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 0, fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <Calendar size={11} /> {work.date}
        </span>
      )}

      {mediaItems.length > 1 && (
        <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 0, fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <ImageIcon size={11} /> +{mediaItems.length - 1} фото
        </span>
      )}

      {isVideo && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
          <PlayCircle size={48} style={{ color: '#ffffff', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }} />
        </div>
      )}
    </article>
  );
}

/* WORK DETAIL POPUP MODAL */
function WorkDetailModal({ work, onClose, onAddToCart, onOpenFullscreen }) {
  if (!work) return null;
  const mediaItems = work.mediaList && work.mediaList.length > 0 
    ? work.mediaList.map(m => ({ ...m, url: formatMediaUrl(m.url) })) 
    : (work.images && work.images.length > 0 ? work.images.map(url => ({ type: 'image', url: formatMediaUrl(url) })) : [{ type: 'image', url: formatMediaUrl(work.image) }]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const nextMedia = () => setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  const prevMedia = () => setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const isCurrentVideo = currentMedia?.type === 'video' || (typeof currentMedia?.url === 'string' && (currentMedia.url.endsWith('.mp4') || currentMedia.url.includes('video')));

  const titleText = stripEmojis(work.title);
  const descText = stripEmojis(work.description);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 999999, background: 'rgba(11, 23, 42, 0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: 0, maxWidth: '920px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderRadius: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--bg-navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Деталі десерту</span>
          </div>
          <button onClick={onClose} style={{ background: '#e2e8f0', color: '#0b172a', border: 'none', width: '32px', height: '32px', borderRadius: 0, cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div onClick={() => onOpenFullscreen(currentMedia.url)} style={{ width: '100%', height: '340px', background: '#0b172a', borderRadius: 0, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              {isCurrentVideo ? <video src={currentMedia.url} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <img src={currentMedia.url} alt={titleText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              {work.date && <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 0, fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {work.date}</span>}
              <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(11,23,42,0.8)', color: '#fff', padding: '4px 10px', borderRadius: 0, fontSize: '10.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Maximize2 size={11} /> На весь екран</span>
              {mediaItems.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevMedia(); }} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
                  <button onClick={(e) => { e.stopPropagation(); nextMedia(); }} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}><ChevronRight size={18} /></button>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '22px', color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '12px' }}>{titleText}</h2>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, marginBottom: '24px', flex: 1, whiteSpace: 'pre-line', overflowY: 'auto', maxHeight: '300px' }}>
              {renderFormattedText(descText)}
            </div>
            <button className="btn-primary" onClick={() => { onAddToCart({ id: `portfolio-${work.id}`, name: titleText, price: 1100, unit: 'грн/кг', img: work.image, desc: descText }); onClose(); }} style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: 0 }}>
              <ShoppingBag size={18} /> Замовити схожий десерт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage({ onAddToCart }) {
  const isTargetPost = (item) => {
    const title = (item.title || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    return title.includes('скеля') || desc.includes('скеля') || title.includes('стильні чоловічі торти') || desc.includes('стильні чоловічі торти');
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
  const [selectedWorkModal, setSelectedWorkModal] = useState(null);

  useEffect(() => {
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
    fetchPortfolio();
  }, []);

  return (
    <div style={{ minHeight: '80vh', padding: '36px 0 80px', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header Mint Banner */}
        <div className="hero-banner" style={{ borderRadius: 0, padding: '24px 36px', marginBottom: '32px' }}>
          <div className="hero-banner-content">
            <div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                Офіційна портфоліо-галерея
              </span>
              <h1 className="hero-banner-title" style={{ fontSize: '36px', marginTop: '4px' }}>
                Наші Роботи & Авторські Десерти
              </h1>
            </div>
          </div>
        </div>

        {/* Portfolio Photo Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '16px', fontWeight: 600 }}>Завантаження робіт...</p>
          </div>
        ) : works.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px dashed var(--border-light)', borderRadius: 0, padding: '48px 24px', textAlign: 'center' }}>
            <Sparkles size={48} style={{ color: 'var(--accent-gold)', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--bg-navy)', marginBottom: '8px' }}>
              Галерея робіт наразі порожня
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 16px' }}>
              Пересилайте фотографії або відео-огляди десертів у Telegram-бот <code>@BELLA_CREME_Manager</code>!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {works.map((work) => (
              <WorkCardCompact
                key={work.id}
                work={work}
                onOpenDetail={(targetWork) => setSelectedWorkModal(targetWork)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Popup Modal */}
      {selectedWorkModal && (
        <WorkDetailModal
          work={selectedWorkModal}
          onClose={() => setSelectedWorkModal(null)}
          onAddToCart={onAddToCart}
          onOpenFullscreen={(mediaUrl) => setFullscreenMedia(mediaUrl)}
        />
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenMedia && (
        <div
          onClick={() => setFullscreenMedia(null)}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000000,
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
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: 0,
              margin: 0,
              lineHeight: 0,
              cursor: 'pointer',
              zIndex: 1000001
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
    </div>
  );
}
