import React, { useEffect, useState } from 'react';
import {
  Sparkles, Send, Calendar, ChevronLeft, ChevronRight, Image as ImageIcon,
  PlayCircle, Video as VideoIcon, Maximize2, X, LayoutGrid, LayoutList, Info, ShoppingBag
} from 'lucide-react';

/* MODE 1: FULL DETAILED CARD */
function WorkCardFull({ work, onAddToCart, onOpenFullscreen, onOpenDetail }) {
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
      <div
        onClick={() => onOpenFullscreen(currentMedia.url)}
        style={{ width: '100%', height: '280px', overflow: 'hidden', position: 'relative', background: '#0b172a', cursor: 'pointer' }}
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

        {mediaItems.length > 1 && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px', background: 'rgba(11,23,42,0.85)',
            color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2
          }}>
            {isCurrentVideo ? <VideoIcon size={12} /> : <ImageIcon size={12} />}
            {activeMediaIndex + 1} / {mediaItems.length} {isCurrentVideo ? 'відео' : 'медіа'}
          </span>
        )}

        {work.date && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,23,42,0.85)',
            color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2
          }}>
            <Calendar size={12} /> {work.date}
          </span>
        )}

        <span style={{
          position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(11,23,42,0.8)',
          color: '#ffffff', padding: '4px 10px', borderRadius: '10px', fontSize: '10.5px', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2
        }}>
          <Maximize2 size={11} /> На весь екран
        </span>

        {mediaItems.length > 1 && (
          <>
            <button onClick={prevMedia} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 0, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.12)', zIndex: 3 }}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMedia} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 0, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.12)', zIndex: 3 }}>
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '18px', color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
          {work.title}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px', flex: 1, whiteSpace: 'pre-line' }}>
          {work.description}
        </p>
        <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '14px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <button onClick={() => onOpenDetail(work)} style={{ background: '#f1f5f9', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-sm)', padding: '8px 14px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={14} /> Докладніше
          </button>
          <button className="btn-primary" onClick={() => onAddToCart({ id: `portfolio-${work.id}`, name: work.title, price: 1100, unit: 'грн/кг', img: work.image, desc: work.description })} style={{ fontSize: '12.5px', padding: '8px 16px' }}>
            Замовити схожий десерт
          </button>
        </div>
      </div>
    </article>
  );
}

/* MODE 2: COMPACT PHOTO RECTANGLE (Pure photo rectangle card) */
function WorkCardCompact({ work, onOpenDetail }) {
  const mediaItems = work.mediaList && work.mediaList.length > 0
    ? work.mediaList 
    : (work.images && work.images.length > 0 ? work.images.map(url => ({ type: 'image', url })) : [{ type: 'image', url: work.image }]);
  const mainMedia = mediaItems[0] || {};
  const isVideo = mainMedia?.type === 'video' || (typeof mainMedia?.url === 'string' && (mainMedia.url.endsWith('.mp4') || mainMedia.url.includes('video')));

  return (
    <article
      onClick={() => onOpenDetail(work)}
      style={{
        background: '#0b172a',
        borderRadius: 'var(--radius-md)',
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
        <video src={mainMedia.url} muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <img src={mainMedia.url || work.image} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
      )}

      {work.date && (
        <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
          <Calendar size={11} /> {work.date}
        </span>
      )}

      {mediaItems.length > 1 && (
        <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 2 }}>
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
  const mediaItems = work.mediaList && work.mediaList.length > 0 ? work.mediaList : (work.images && work.images.length > 0 ? work.images.map(url => ({ type: 'image', url })) : [{ type: 'image', url: work.image }]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const nextMedia = () => setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  const prevMedia = () => setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const isCurrentVideo = currentMedia?.type === 'video' || (typeof currentMedia?.url === 'string' && (currentMedia.url.endsWith('.mp4') || currentMedia.url.includes('video')));

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 999999, background: 'rgba(11, 23, 42, 0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: '16px', maxWidth: '920px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--bg-navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Деталі десерту</span>
          </div>
          <button onClick={onClose} style={{ background: '#e2e8f0', color: '#0b172a', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div onClick={() => onOpenFullscreen(currentMedia.url)} style={{ width: '100%', height: '340px', background: '#0b172a', borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
              {isCurrentVideo ? <video src={currentMedia.url} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <img src={currentMedia.url} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              {work.date && <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(11,23,42,0.85)', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {work.date}</span>}
              <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(11,23,42,0.8)', color: '#fff', padding: '4px 10px', borderRadius: '10px', fontSize: '10.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Maximize2 size={11} /> На весь екран</span>
              {mediaItems.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevMedia(); }} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}><ChevronLeft size={18} /></button>
                  <button onClick={(e) => { e.stopPropagation(); nextMedia(); }} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', color: '#0b172a', border: '1px solid #cbd5e1', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}><ChevronRight size={18} /></button>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '22px', color: 'var(--bg-navy)', fontWeight: 700, marginBottom: '12px' }}>{work.title}</h2>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, marginBottom: '24px', flex: 1, whiteSpace: 'pre-line', overflowY: 'auto', maxHeight: '300px' }}>{work.description}</div>
            <button className="btn-primary" onClick={() => { onAddToCart({ id: `portfolio-${work.id}`, name: work.title, price: 1100, unit: 'грн/кг', img: work.image, desc: work.description }); onClose(); }} style={{ width: '100%', padding: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('portfolio_card_view_mode') || 'compact');

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('portfolio_card_view_mode', mode);
  };

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
        <div style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px 32px', marginBottom: '28px', border: '1px solid var(--border-light)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>Офіційна портфоліо-галерея</span>
            <h1 style={{ fontSize: '32px', fontFamily: "'Georgia', serif", color: 'var(--bg-navy)', fontWeight: 700, margin: '4px 0 0' }}>Мої Роботи & Авторські Десерти</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '4px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
            <button onClick={() => handleSetViewMode('compact')} style={{ background: viewMode === 'compact' ? '#0b172a' : 'transparent', color: viewMode === 'compact' ? '#ffffff' : '#475569', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutGrid size={16} /> Галерея фото
            </button>
            <button onClick={() => handleSetViewMode('full')} style={{ background: viewMode === 'full' ? '#0b172a' : 'transparent', color: viewMode === 'full' ? '#ffffff' : '#475569', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutList size={16} /> Розгорнутий опис
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>Завантаження робіт...</div>
        ) : works.length === 0 ? (
          <div style={{ background: '#ffffff', padding: '48px', textAlign: 'center' }}>Галерея порожня</div>
        ) : viewMode === 'compact' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {works.map((work) => <WorkCardCompact key={work.id} work={work} onOpenDetail={setSelectedWorkModal} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
            {works.map((work) => <WorkCardFull key={work.id} work={work} onAddToCart={onAddToCart} onOpenDetail={setSelectedWorkModal} onOpenFullscreen={setFullscreenMedia} />)}
          </div>
        )}
      </div>

      {selectedWorkModal && <WorkDetailModal work={selectedWorkModal} onClose={() => setSelectedWorkModal(null)} onAddToCart={onAddToCart} onOpenFullscreen={setFullscreenMedia} />}

      {fullscreenMedia && (
        <div onClick={() => setFullscreenMedia(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: 'rgba(11, 23, 42, 0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setFullscreenMedia(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.25)', color: '#fff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer' }}><X size={26} /></button>
          {fullscreenMedia.endsWith('.mp4') || fullscreenMedia.includes('video') ? <video src={fullscreenMedia} controls autoPlay style={{ maxWidth: '92vw', maxHeight: '85vh' }} /> : <img src={fullscreenMedia} alt="Full" style={{ maxWidth: '92vw', maxHeight: '85vh' }} />}
        </div>
      )}
    </div>
  );
}
